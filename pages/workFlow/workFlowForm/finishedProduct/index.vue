<template>
	<view class="jnpf-wrap jnpf-wrap-workflow">
		<u-form :model="dataForm" :rules="rules" ref="dataForm" :errorType="['toast']" label-position="left"
			label-width="150" label-align="left">
			<u-form-item label="流程标题" prop="flowTitle" required>
				<u-input v-model="dataForm.flowTitle" placeholder="流程标题"></u-input>
			</u-form-item>
			<u-form-item label="流程编码" prop="billNo" v-if="judgeShow('billNo')" required>
				<u-input v-model="dataForm.billNo" placeholder="流程编码" ></u-input>
			</u-form-item>
			<u-form-item label="紧急程度" prop="flowUrgent" required>
				<jnpf-select v-model="dataForm.flowUrgent" placeholder="请选择紧急程度" :options="flowUrgentOptions">
				</jnpf-select>
			</u-form-item>

			<view class="jnpf-card">
				<u-form-item label="入库人" prop="warehouseName" v-if="judgeShow('warehouseName')">
					<u-input v-model="dataForm.warehouseName" placeholder="入库人"></u-input>
				</u-form-item>
				<u-form-item label="仓库" prop="warehouse" v-if="judgeShow('warehouse')">
					<u-input v-model="dataForm.warehouse" placeholder="请输入选仓库"></u-input>
				</u-form-item>
				<u-form-item label="入库时间" prop="reservoirDate" v-if="judgeShow('reservoirDate')" required>
					<jnpf-date-time type="datetime" v-model="dataForm.reservoirDate" placeholder="请选择入库时间"></jnpf-date-time>
				</u-form-item>
				<u-form-item label="备注" prop="description" v-if="judgeShow('description')">
					<u-input v-model="dataForm.description" placeholder="备注" type="textarea"></u-input>
				</u-form-item>
			</view>
			

			<view class="jnpf-table">
				<view class="jnpf-table-item" v-for="(item,i) in dataForm.entryList" :key="i">
					<view class="jnpf-table-item-title u-flex u-row-between">
						<text class="jnpf-table-item-title-num">商品添购({{i+1}})</text>
						<view class="jnpf-table-item-title-action" v-if="dataForm.entryList.length>1"
							@click="delItem(i)">删除
						</view>
					</view>
					<u-form-item label="商品名称" prop="dataForm.entryList[i].tradeName">
						<u-input v-model="dataForm.entryList[i].tradeName" placeholder="请输入商品名称"></u-input>
					</u-form-item>
					<u-form-item label="规格类型" prop="dataForm.entryList[i].specifications">
						<u-input v-model="dataForm.entryList[i].specifications" placeholder="请输入规格类型"></u-input>
					</u-form-item>
					<u-form-item label="单位" prop="dataForm.entryList[i].unit">
						<u-input v-model="dataForm.entryList[i].unit" placeholder="请输入单位" ></u-input>
					</u-form-item>
					<u-form-item label="数量" prop="dataForm.entryList[i].qty">
						<u-input v-model="dataForm.entryList[i].qty" placeholder="请输入数量" type="number"
							@input="count(dataForm.entryList[i])"></u-input>
					</u-form-item>
					<u-form-item label="单价" prop="dataForm.entryList[i].price">
						<u-input v-model="dataForm.entryList[i].price" placeholder="请输入单价" type="number"
							@input="count(dataForm.entryList[i])"></u-input>
					</u-form-item>
					<u-form-item label="金额" prop="dataForm.entryList[i].amount">
						<u-input v-model="dataForm.entryList[i].amount" placeholder="请输入金额" ></u-input>
					</u-form-item>
					<u-form-item label="收款摘要" prop="dataForm.entryList[i].description">
						<u-input v-model="dataForm.entryList[i].description" placeholder="请输入收款摘要" type="textarea"></u-input>
					</u-form-item>
				</view>
				<view class="jnpf-table-addBtn" @click="addItem">
					<u-icon name="plus" color="#2979ff"></u-icon>添加
				</view>
			</view>
		</u-form>
	</view>
</template>

<script>
	import comMixin from '../mixin'
	export default {
		name: 'FinishedProductNo',
		mixins: [comMixin],
		data() {
			return {
				billEnCode: 'WF_FinishedProductNo',
				dataForm: {
					flowTitle: '',
					billNo: '',
					flowUrgent: 1,
					reservoirDate: '',
					warehouseName: '',
					description: '',
					warehouse: '',
					entryList: [{
						tradeName: '',
						specifications: '',
						unit: '',
						qty: '',
						price: '',
						amount: '',
						description:''
					}]
				},
				rules: {
					flowTitle: [{
						required: true,
						message: '流程标题不能为空',
						trigger: 'blur'
					}],
					flowUrgent: [{
						required: true,
						message: '紧急程度不能为空',
						trigger: 'change',
						type: 'number'
					}],
					billNo: [{
						required: true,
						message: '流程编码不能为空',
						trigger: 'blur',
					}],
					reservoirDate: [{
						required: true,
						message: '入库时间不能为空',
						trigger: 'blur',
						type: 'number'
					}],
				},
			}
		},
		methods: {
			selfInit(data) {
				this.dataForm.applyDate = new Date().getTime()
				this.dataForm.flowTitle = this.userInfo.userName + "的成品入库单"
				this.dataForm.applyUser = this.userInfo.userName + '/' + this.userInfo.userAccount
				if (this.userInfo.positionIds && this.userInfo.positionIds.length) {
					let list = this.userInfo.positionIds.map(o => o.name)
					this.dataForm.position = list.join(',')
				}
			},
			/* 添加子表 */
			addItem() {
				const item = {
					tradeName: '',
					specifications: '',
					unit: '',
					qty: '',
					price: '',
					amount: '',
					description:''
				}
				this.dataForm.entryList.push(item)
			},
			/* 删除子表 */
			delItem(index) {
				this.dataForm.entryList.splice(index, 1)
			},

			/* 计算价格 */
			count(row) {
				//金额 = 数量*单价
				row.amount = this.jnpf.toDecimal(parseFloat(row.price) * parseFloat(row.qty))
				//折扣价 = (单价*折扣)
				var discountPrice = row.price * (row.discount / 100);
				//实际单价 = 折扣价 * (1 + (税率 / 100))
				row.actualPrice = this.jnpf.toDecimal(discountPrice * (1 + (row.cess / 100)));
				//实际金额
				row.actualAmount = this.jnpf.toDecimal(parseFloat(row.actualPrice) * parseFloat(row
					.qty))
				this.$forceUpdate()
			}
		}
	}
</script>

<style>

</style>
