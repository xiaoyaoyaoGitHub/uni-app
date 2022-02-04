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
				<u-form-item label="客户名称" prop="customerName" v-if="judgeShow('customerName')" required>
					<u-input v-model="dataForm.customerName" placeholder="请输入客户名称"
						:disabled="judgeWrite('customerName')"></u-input>
				</u-form-item>
				<u-form-item label="联系人员" prop="contacts" v-if="judgeShow('contacts')">
					<u-input v-model="dataForm.contacts" placeholder="请输入联系人员" :disabled="judgeWrite('contacts')">
					</u-input>
				</u-form-item>
				<u-form-item label="开单日期" prop="salesDate" v-if="judgeShow('salesDate')" required>
					<cudt-date-time type="datetime" v-model="dataForm.salesDate" placeholder="请输入开单日期"
						:disabled="judgeWrite('salesDate')"></cudt-date-time>
				</u-form-item>
				<u-form-item label="联系电话" prop="contactPhone" v-if="judgeShow('contactPhone')">
					<u-input v-model="dataForm.contactPhone" placeholder="请输入联系电话"
						:disabled="judgeWrite('contactPhone')"></u-input>
				</u-form-item>
				<u-form-item label="客户地址" prop="customerAddres" v-if="judgeShow('customerAddres')">
					<u-input v-model="dataForm.customerAddres" placeholder="输入送客户地址"
						:disabled="judgeWrite('customerAddres')"></u-input>
				</u-form-item>
				<u-form-item label="业务人员" prop="salesman" v-if="judgeShow('salesman')">
					<u-input v-model="dataForm.salesman" placeholder="输入业务人员" :disabled="judgeWrite('salesman')">
					</u-input>
				</u-form-item>
				<u-form-item label="发票编号" prop="ticketNum" v-if="judgeShow('ticketNum')">
					<u-input v-model="dataForm.ticketNum" placeholder="输入发票编号" :disabled="judgeWrite('ticketNum')">
					</u-input>
				</u-form-item>
				<u-form-item label="发票类型" prop="invoiceType" v-if="judgeShow('invoiceType')">
					<cudt-select v-model="dataForm.invoiceType" placeholder="请选择发票类型" :options="invoiceTypeList"
						:disabled="judgeWrite('invoiceType')"></cudt-select>
				</u-form-item>
				<u-form-item label="付款方式" prop="paymentMethod" v-if="judgeShow('paymentMethod')">
					<u-input v-model="dataForm.paymentMethod" placeholder="请输入付款方式" :disabled="judgeWrite('paymentMethod')">
					</u-input>
				</u-form-item>
				<u-form-item label="付款金额" prop="paymentMoney" v-if="judgeShow('paymentMoney')">
					<u-input v-model="dataForm.paymentMoney" placeholder="输入付款金额"
						:disabled="judgeWrite('paymentMoney')"></u-input>
				</u-form-item>
				<u-form-item label="相关附件" prop="fileJson" v-if="judgeShow('fileJson')">
					<cudt-file :list="fileList" :disabled="judgeWrite('fileJson')" />
				</u-form-item>
				<u-form-item label="开单备注" prop="description" v-if="judgeShow('description')">
					<u-input v-model="dataForm.description" placeholder="输入开单备注" type="textarea"
						:disabled="judgeWrite('description')"></u-input>
				</u-form-item>
			</view>
			<view class="cudt-table" v-if="judgeShow('entryList')">
				<view class="cudt-table-item" v-for="(item,i) in dataForm.entryList" :key="i">
					<view class="cudt-table-item-title u-flex u-row-between">
						<text class="cudt-table-item-title-num">销售明细({{i+1}})</text>
						<view class="cudt-table-item-title-action" v-if="dataForm.entryList.length>1"
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
		name: 'SalesOrder',
		mixins: [comMixin],
		data() {
			return {
				billEnCode: 'WF_SalesOrderNo',
				dataForm: {
					flowTitle: '',
					billNo: '',
					flowUrgent: 1,
					customerAddres: '',
					contactPhone: '',
					description: '',
					fileJson: '',
					salesman: '',
					paymentMoney: '',
					paymentMethod: '',
					invoiceType: '',
					salesDate: '',
					contacts: '',
					customerName: '',
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
					customerName: [{
						required: true,
						message: '客户名称不能为空',
						trigger: 'blur',
					}],
					salesDate: [{
						required: true,
						message: '开单日期不能为空',
						trigger: 'blur',
						type: 'number'
					}],
					contactPhone: [{
						pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
						message: '手机号码不正确',
						type: 'string',
						trigger: ['change', 'blur'],
					}],
				},
				invoiceTypeList: [{
						fullName: "普通发票",
						id: "普通发票",
						checked: false
					},
					{
						fullName: "专业发票",
						id: "专业发票",
						checked: false
					},
					{
						fullName: "其他",
						id: "其他",
						checked: false
					}
				],
			}
		},
		methods: {
			selfInit(data) {
				this.dataForm.flowTitle = this.userInfo.userName + "的销售订单";
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
			},
		}
	}
</script>

<style>

</style>
