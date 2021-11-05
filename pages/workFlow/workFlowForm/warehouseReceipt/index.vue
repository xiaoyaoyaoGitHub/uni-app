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
				<u-form-item label="供应商名称" prop="supplierName" v-if="judgeShow('supplierName')">
					<u-input v-model="dataForm.supplierName" placeholder="请输入供应商名称"
						:disabled="judgeWrite('supplierName')"></u-input>
				</u-form-item>
				<u-form-item label="联系电话" prop="contactPhone" v-if="judgeShow('contactPhone')" required>
					<u-input v-model="dataForm.contactPhone" placeholder="请输入联系电话"
						:disabled="judgeWrite('contactPhone')"></u-input>
				</u-form-item>
				<u-form-item label="入库类别" prop="warehousCategory" v-if="judgeShow('warehousCategory')">
					<u-input v-model="dataForm.warehousCategory" placeholder="请输入入库类别"
						:disabled="judgeWrite('warehousCategory')"></u-input>
				</u-form-item>
				<u-form-item label="仓库" prop="warehouse" v-if="judgeShow('warehouse')">
					<u-input v-model="dataForm.warehouse" placeholder="请输入仓库" :disabled="judgeWrite('warehouse')">
					</u-input>
				</u-form-item>
				<u-form-item label="入库人" prop="warehousesPeople" v-if="judgeShow('warehousesPeople')">
					<u-input v-model="dataForm.warehousesPeople" placeholder="请输入入库人"
						:disabled="judgeWrite('warehousesPeople')"></u-input>
				</u-form-item>
				<u-form-item label="送货单号" prop="deliveryNo" v-if="judgeShow('deliveryNo')">
					<u-input v-model="dataForm.deliveryNo" placeholder="请输入送货单号" :disabled="judgeWrite('deliveryNo')">
					</u-input>
				</u-form-item>
				<u-form-item label="入库单号" prop="warehouseNo" v-if="judgeShow('warehouseNo')">
					<u-input v-model="dataForm.warehouseNo" placeholder="请输入入库单号" type="number"
						:disabled="judgeWrite('warehouseNo')"></u-input>
				</u-form-item>
				<u-form-item label="入库日期" prop="warehousDate" v-if="judgeShow('warehousDate')" required>
					<cudt-date-time type="datetime" v-model="dataForm.warehousDate" placeholder="请输入入库日期"
						:disabled="judgeWrite('warehousDate')"></cudt-date-time>
				</u-form-item>

			</view>

			<view class="cudt-table" v-if="judgeShow('entryList')">
				<view class="cudt-table-item" v-for="(item,i) in dataForm.entryList" :key="i">
					<view class="cudt-table-item-title u-flex u-row-between">
						<text class="cudt-table-item-title-num">入库明细({{i+1}})</text>
						<view class="cudt-table-item-title-action" v-if="dataForm.entryList.length>1"
							@click="delItem(i)">删除
						</view>
					</view>
					<u-form-item label="商品名称" prop="dataForm.entryList[i].goodsName">
						<u-input v-model="dataForm.entryList[i].goodsName" placeholder="请输入商品名称"
							:disabled="judgeWrite('entryList')"></u-input>
					</u-form-item>
					<u-form-item label="规格型号" prop="dataForm.entryList[i].specifications">
						<u-input v-model="dataForm.entryList[i].specifications" placeholder="规格类型"
							:disabled="judgeWrite('entryList')"></u-input>
					</u-form-item>
					<u-form-item label="单位" prop="dataForm.entryList[i].unit">
						<u-input v-model="dataForm.entryList[i].unit" placeholder="单位"
							:disabled="judgeWrite('entryList')"></u-input>
					</u-form-item>
					<u-form-item label="数量" prop="dataForm.entryList[i].qty">
						<u-input v-model="dataForm.entryList[i].qty" placeholder="数量" type="number"
							@input="count(dataForm.entryList[i])" :disabled="judgeWrite('entryList')"></u-input>
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
		name: 'WarehouseReceipt',
		mixins: [comMixin],
		data() {
			return {
				billEnCode: 'WF_WarehouseReceiptNo',
				dataForm: {
					flowTitle: '',
					billNo: '',
					flowUrgent: 1,
					supplierName: '',
					contactPhone: '',
					position: '',
					warehousCategory: '',
					warehousDate: '',
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
					contactPhone: [{
						required: true,
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
				this.dataForm.flowTitle = this.userInfo.userName + "的入库申请"
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
				row.amount = this.cudt.toDecimal(parseFloat(row.price) * parseFloat(row.qty))
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
