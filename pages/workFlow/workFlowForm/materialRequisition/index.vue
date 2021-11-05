<template>
	<view class="cudt-wrap cudt-wrap-workflow">
		<u-form :model="dataForm" :rules="rules" ref="dataForm" :errorType="['toast']" label-position="left"
			label-width="150" label-align="left">
			<u-form-item label="流程标题" prop="flowTitle" v-if="judgeShow('flowTitle')" required>
				<u-input v-model="dataForm.flowTitle" placeholder="流程标题" :disabled="judgeWrite('flowTitle')"></u-input>
			</u-form-item>
			<u-form-item label="流程编码" prop="billNo" v-if="judgeShow('billNo')" required>
				<u-input v-model="dataForm.billNo" placeholder="流程编码" disabled></u-input>
			</u-form-item>
			<u-form-item label="紧急程度" prop="flowUrgent" v-if="judgeShow('flowUrgent')" required>
				<cudt-select v-model="dataForm.flowUrgent" placeholder="请选择紧急程度" :options="flowUrgentOptions"
					:disabled="judgeWrite('flowUrgent')">
				</cudt-select>
			</u-form-item>

			<view class="cudt-card">
				<u-form-item label="领料人员" prop="leadPeople" v-if="judgeShow('leadPeople')" required>
					<u-input v-model="dataForm.leadPeople" placeholder="请输入领料人员" :disabled="judgeWrite('leadPeople')">
					</u-input>
				</u-form-item>
				<u-form-item label="领料部门" prop="leadDepartment" v-if="judgeShow('leadDepartment')" required>
					<u-input v-model="dataForm.leadDepartment" placeholder="请输入领料部门"
						:disabled="judgeWrite('leadDepartment')"></u-input>
				</u-form-item>
				<u-form-item label="领料日期" prop="leadDate" v-if="judgeShow('leadDate')" required>
					<cudt-date-time type="datetime" v-model="dataForm.leadDate" placeholder="请输入领料日期"
						:disabled="judgeWrite('leadDate')"></cudt-date-time>
				</u-form-item>
				<u-form-item label="仓库" prop="warehouse" v-if="judgeShow('warehouse')">
					<u-input v-model="dataForm.warehouse" placeholder="请输入仓库" type="number"
						:disabled="judgeWrite('warehouse')"></u-input>
				</u-form-item>
				<u-form-item label="备注" prop="description" v-if="judgeShow('description')">
					<u-input v-model="dataForm.description" placeholder="请输入备注" type="textarea"
						:disabled="judgeWrite('description')"></u-input>
				</u-form-item>
			</view>

			<view class="cudt-table" v-if="judgeShow('entryList')">
				<view class="cudt-table-item" v-for="(item,i) in dataForm.entryList" :key="i">
					<view class="cudt-table-item-title u-flex u-row-between">
						<text class="cudt-table-item-title-num">商品添购({{i+1}})</text>
						<view class="cudt-table-item-title-action" v-if="dataForm.entryList.length>1"
							@click="delItem(i)">删除
						</view>
					</view>
					<u-form-item label="商品名称" prop="dataForm.entryList[i].goodsName">
						<u-input v-model="dataForm.entryList[i].goodsName" placeholder="请输入商品名称"
							:disabled="judgeWrite('entryList')"></u-input>
					</u-form-item>
					<u-form-item label="规格类型" prop="dataForm.entryList[i].specifications">
						<u-input v-model="dataForm.entryList[i].specifications" placeholder="规格类型"
							:disabled="judgeWrite('entryList')"></u-input>
					</u-form-item>
					<u-form-item label="单位" prop="dataForm.entryList[i].unit">
						<u-input v-model="dataForm.entryList[i].unit" placeholder="单位"
							:disabled="judgeWrite('entryList')"></u-input>
					</u-form-item>
					<u-form-item label="需数量" prop="dataForm.entryList[i].materialDemand">
						<u-number-box v-model="dataForm.entryList[i].materialDemand" :min="0" :max="100" :step="1"
							:input-width="120" :positive-integer="false" :input-height="60"
							:disabled="judgeWrite('entryList')"></u-number-box>
					</u-form-item>
					<u-form-item label="配数量" prop="dataForm.entryList[i].proportioning">
						<u-number-box v-model="dataForm.entryList[i].proportioning" :min="0" :max="100" :step="1"
							:input-width="120" :positive-integer="false" :input-height="60"
							@change="count(dataForm.entryList[i])" :disabled="judgeWrite('entryList')"></u-number-box>
					</u-form-item>
					<u-form-item label="单价" prop="dataForm.entryList[i].price">
						<u-input v-model="dataForm.entryList[i].price" placeholder="单价" type="number"
							@input="count(dataForm.entryList[i])" :disabled="judgeWrite('entryList')"></u-input>
					</u-form-item>
					<u-form-item label="金额" prop="dataForm.entryList[i].amount">
						<u-input v-model="dataForm.entryList[i].amount" placeholder="金额" disabled></u-input>
					</u-form-item>
					<u-form-item label="备注" prop="dataForm.entryList[i].description">
						<u-input v-model="dataForm.entryList[i].description" placeholder="备注"
							:disabled="judgeWrite('entryList')"></u-input>
					</u-form-item>
				</view>
				<view class="cudt-table-addBtn" @click="addItem">
					<u-icon name="plus" color="#2979ff"></u-icon>添加
				</view>
			</view>
		</u-form>
	</view>
</template>

<script>
	import comMixin from '../mixin'
	export default {
		name: 'MaterialRequisition',
		mixins: [comMixin],
		data() {
			return {
				billEnCode: 'WF_MaterialRequisitionNo',
				dataForm: {
					flowTitle: '',
					billNo: '',
					flowUrgent: 1,
					leadPeople: '',
					warehouse: '',
					leadDate: '',
					leadDepartment: '',
					description:'',
					entryList: [{
						goodsName: '',
						specifications: '',
						unit: '',
						proportioning: 0,
						materialDemand: 0,
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
					leadDate: [{
						required: true,
						message: '领料日期不能为空',
						trigger: 'blur',
						type: 'number'
					}],
					leadPeople: [{
						required: true,
						message: '领料人员不能为空',
						trigger: 'blur',
					}],
					leadDepartment: [{
						required: true,
						message: '领料部门不能为空',
						trigger: 'blur',
					}],
				},
			}
		},
		methods: {
			selfInit(data) {
				this.dataForm.flowTitle = this.userInfo.userName + "的领料单"
			},
			/* 添加子表 */
			addItem() {
				const item = {
					goodsName: '',
					specifications: '',
					unit: '',
					proportioning: 0,
					materialDemand: 0,
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
				row.amount = this.cudt.toDecimal(parseFloat(row.price) * parseFloat(row.proportioning))
				//折扣价 = (单价*折扣)
				var discountPrice = row.price * (row.discount / 100);
				//实际单价 = 折扣价 * (1 + (税率 / 100))
				row.actualPrice = this.cudt.toDecimal(discountPrice * (1 + (row.cess / 100)));
				//实际金额
				row.actualAmount = this.cudt.toDecimal(parseFloat(row.actualPrice) * parseFloat(row
					.qty))
				this.$forceUpdate()
			}
		}
	}
</script>

<style>

</style>
