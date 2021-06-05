<template>
	<view class="jnpf-wrap jnpf-wrap-workflow">
		<u-form :model="dataForm" :rules="rules" ref="dataForm" :errorType="['toast']" label-position="left"
			label-width="150" label-align="left">
			<u-form-item label="流程标题" prop="flowTitle" v-if="judgeShow('flowTitle')" required>
				<u-input v-model="dataForm.flowTitle" placeholder="流程标题" :disabled="judgeWrite('flowTitle')"></u-input>
			</u-form-item>
			<u-form-item label="流程编码" prop="billNo" v-if="judgeShow('billNo')" required>
				<u-input v-model="dataForm.billNo" placeholder="流程编码" disabled></u-input>
			</u-form-item>
			<u-form-item label="紧急程度" prop="flowUrgent" v-if="judgeShow('flowUrgent')" required>
				<jnpf-select v-model="dataForm.flowUrgent" placeholder="请选择紧急程度" :options="flowUrgentOptions"
					:disabled="judgeWrite('flowUrgent')">
				</jnpf-select>
			</u-form-item>

			<view class="jnpf-card">
				<u-form-item label="申请人员" prop="applyUser" v-if="judgeShow('applyUser')">
					<u-input v-model="dataForm.applyUser" placeholder="请输入申请人员" :disabled="judgeWrite('applyUser')">
					</u-input>
				</u-form-item>
				<u-form-item label="申请部门" prop="departmental" v-if="judgeShow('departmental')">
					<u-input v-model="dataForm.departmental" placeholder="请输入申请部门"
						:disabled="judgeWrite('departmental')"></u-input>
				</u-form-item>
				<u-form-item label="供应商名称" prop="vendorName" v-if="judgeShow('vendorName')">
					<u-input v-model="dataForm.vendorName" placeholder="请输入供应商名称" :disabled="judgeWrite('vendorName')">
					</u-input>
				</u-form-item>
				<u-form-item label="采购人员" prop="buyer" v-if="judgeShow('buyer')">
					<u-input v-model="dataForm.buyer" placeholder="输入采购人员" :disabled="judgeWrite('buyer')"></u-input>
				</u-form-item>
				<u-form-item label="采购日期" prop="purchaseDate" v-if="judgeShow('purchaseDate')" required>
					<jnpf-date-time type="date" v-model="dataForm.purchaseDate" placeholder="请输入采购日期"
						:disabled="judgeWrite('purchaseDate')"></jnpf-date-time>
				</u-form-item>

				<u-form-item label="仓库" prop="warehouse" v-if="judgeShow('warehouse')">
					<u-input v-model="dataForm.warehouse" placeholder="输入仓库" :disabled="judgeWrite('warehouse')">
					</u-input>
				</u-form-item>
				<u-form-item label="联系方式" prop="telephone" v-if="judgeShow('telephone')">
					<u-input v-model="dataForm.telephone" placeholder="输入联系方式" type="number"
						:disabled="judgeWrite('telephone')"></u-input>
				</u-form-item>
				<u-form-item label="结算方式" prop="paymentMethod" v-if="judgeShow('paymentMethod')" required>
					<jnpf-select v-model="dataForm.paymentMethod" placeholder="请选择结算方式" :options="paymentMethodOptions"
						:disabled="judgeWrite('paymentMethod')"></jnpf-select>
				</u-form-item>
				<u-form-item label="支付总额" prop="paymentMoney" v-if="judgeShow('paymentMoney')">
					<u-input v-model="dataForm.paymentMoney" placeholder="输入支付总额" type="number"
						:disabled="judgeWrite('paymentMoney')"></u-input>
				</u-form-item>
				<u-form-item label="相关附件" prop="fileJson" v-if="judgeShow('fileJson')">
					<jnpf-file :list="fileList" :disabled="judgeWrite('fileJson')" />
				</u-form-item>
				<u-form-item label="用途原因" prop="reason" v-if="judgeShow('reason')">
					<u-input v-model="dataForm.reason" placeholder="用途原因" type="textarea"
						:disabled="judgeWrite('reason')"></u-input>
				</u-form-item>
			</view>


			<view class="jnpf-table">
				<view class="jnpf-table-item" v-for="(item,i) in dataForm.entryList" :key="i">
					<view class="jnpf-table-item-title u-flex u-row-between">
						<text class="jnpf-table-item-title-num">采购详情({{i+1}})</text>
						<view class="jnpf-table-item-title-action" v-if="dataForm.entryList.length>1"
							@click="delItem(i)">删除
						</view>
					</view>
					<u-form-item label="商品名称" prop="dataForm.entryList[i].goodsName">
						<u-input v-model="dataForm.entryList[i].goodsName" placeholder="请输入商品名称"
							:disabled="judgeWrite('entryList')"></u-input>
					</u-form-item>
					<u-form-item label="规格类型" prop="dataForm.entryList[i].specifications">
						<u-input v-model="dataForm.entryList[i].specifications" placeholder="请输入规格类型"
							:disabled="judgeWrite('entryList')"></u-input>
					</u-form-item>
					<u-form-item label="单位" prop="dataForm.entryList[i].unit">
						<u-input v-model="dataForm.entryList[i].unit" placeholder="请输入单位"
							:disabled="judgeWrite('entryList')"></u-input>
					</u-form-item>
					<u-form-item label="数量" prop="dataForm.entryList[i].qty">
						<u-input v-model="dataForm.entryList[i].qty" placeholder="请输入数量" type="number"
							@input="count(dataForm.entryList[i])" :disabled="judgeWrite('entryList')"></u-input>
					</u-form-item>
					<u-form-item label="单价" prop="dataForm.entryList[i].price">
						<u-input v-model="dataForm.entryList[i].price" placeholder="请输入单价" type="number"
							@input="count(dataForm.entryList[i])" :disabled="judgeWrite('entryList')"></u-input>
					</u-form-item>
					<u-form-item label="金额" prop="dataForm.entryList[i].amount">
						<u-input v-model="dataForm.entryList[i].amount" placeholder="请输入金额" disabled></u-input>
					</u-form-item>
					<u-form-item label="备注" prop="dataForm.entryList[i].description">
						<u-input v-model="dataForm.entryList[i].description" placeholder="请输入备注" type="textarea"
							:disabled="judgeWrite('entryList')"></u-input>
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
		name: 'PurchaseList',
		mixins: [comMixin],
		data() {
			return {
				billEnCode: 'WF_PurchaseListNo',
				dataForm: {
					flowTitle: '',
					billNo: '',
					flowUrgent: 1,
					warehouse: '',
					vendorName: '',
					reason: '',
					fileJson: '',
					buyer: '',
					telephone: '',
					paymentMethod: '',
					purchaseDate: '',
					departmental: '',
					applyUser: '',
					paymentMoney: '',
					entryList: [{
						goodsName: '',
						specifications: '',
						unit: '',
						qty: '',
						price: '',
						amount: '',
						description: ''
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
					paymentMethod: [{
						required: true,
						message: '结算方式不能为空',
						trigger: 'blur',
					}],
					purchaseDate: [{
						required: true,
						message: '采购日期不能为空',
						trigger: 'blur',
						type: 'number'
					}],
					telephone: [{
						pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
						message: '手机号码不正确',
						type: 'string',
						trigger: ['change', 'blur'],
					}],
				},
			}
		},
		methods: {
			selfInit(data) {
				this.dataForm.applyDate = new Date().getTime()
				this.dataForm.flowTitle = this.userInfo.userName + "的日常物品采购清单"
				this.dataForm.applyUser = this.userInfo.userName + '/' + this.userInfo.userAccount
				this.dataForm.departmental = this.userInfo.departmentName
				if (this.userInfo.positionIds && this.userInfo.positionIds.length) {
					let list = this.userInfo.positionIds.map(o => o.name)
					this.dataForm.position = list.join(',')
				}
			},
			/* 添加子表 */
			addItem() {
				const item = {
					goodsName: '',
					specifications: '',
					unit: '',
					qty: '',
					price: '',
					amount: '',
					description: ''
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
			},
			beforeInit() {
				this.getPaymentMethodOptions()
			}
		}
	}
</script>

<style>

</style>
