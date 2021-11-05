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
				<u-form-item label="申请人员" prop="applyUser" v-if="judgeShow('applyUser')">
					<u-input v-model="dataForm.applyUser" placeholder="请输入申请人员" :disabled="judgeWrite('applyUser')">
					</u-input>
				</u-form-item>
				<u-form-item label="申请部门" prop="department" v-if="judgeShow('department')">
					<u-input v-model="dataForm.department" placeholder="请输入申请部门" :disabled="judgeWrite('department')">
					</u-input>
				</u-form-item>
				<u-form-item label="申请日期" prop="applyDate" v-if="judgeShow('applyDate')">
					<cudt-date-time type="date" v-model="dataForm.applyDate" placeholder="请输入申请日期"
						:disabled="judgeWrite('applyDate')"></cudt-date-time>
				</u-form-item>

				<u-form-item label="合同编号" prop="contractNum" v-if="judgeShow('contractNum')">
					<u-input v-model="dataForm.contractNum" placeholder="请输入合同编号" :disabled="judgeWrite('contractNum')">
					</u-input>
				</u-form-item>
				<u-form-item label="非合同支出" prop="nonContract" v-if="judgeShow('nonContract')">
					<u-input v-model="dataForm.nonContract" placeholder="请输入非合同支出"
						:disabled="judgeWrite('nonContract')"></u-input>
				</u-form-item>
				<u-form-item label="开户银行" prop="accountOpeningBank" v-if="judgeShow('accountOpeningBank')">
					<u-input v-model="dataForm.accountOpeningBank" placeholder="请输入开户银行"
						:disabled="judgeWrite('accountOpeningBank')"></u-input>
				</u-form-item>
				<u-form-item label="开户账号" prop="bankAccount" v-if="judgeShow('bankAccount')">
					<u-input v-model="dataForm.bankAccount" placeholder="请输入开户账号" :disabled="judgeWrite('bankAccount')">
					</u-input>
				</u-form-item>

				<u-form-item label="开户姓名" prop="openAccount" v-if="judgeShow('openAccount')">
					<u-input v-model="dataForm.openAccount" placeholder="请输入开户姓名" :disabled="judgeWrite('openAccount')">
					</u-input>
				</u-form-item>
				<u-form-item label="合计费用" prop="total" v-if="judgeShow('total')">
					<u-input v-model="dataForm.total" placeholder="请输入合计费用" :disabled="judgeWrite('total')"></u-input>
				</u-form-item>
				<u-form-item label="支付方式" prop="paymentMethod" v-if="judgeShow('paymentMethod')" required>
					<cudt-select v-model="dataForm.paymentMethod" placeholder="请选择支付方式" :options="paymentMethodOptions"
						:disabled="judgeWrite('paymentMethod')" :props="payProps"></cudt-select>
				</u-form-item>
				<u-form-item label="支付金额" prop="amountPayment" v-if="judgeShow('amountPayment')">
					<u-input v-model="dataForm.amountPayment" placeholder="请输入支付金额"
						:disabled="judgeWrite('amountPayment')"></u-input>
				</u-form-item>
				<u-form-item label="备注" prop="description" v-if="judgeShow('description')">
					<u-input v-model="dataForm.description" placeholder="请输入备注" type="textarea"
						:disabled="judgeWrite('description')"></u-input>
				</u-form-item>
			</view>
		</u-form>
	</view>
</template>

<script>
	import comMixin from '../mixin'
	export default {
		name: 'ExpenseExpenditure',
		mixins: [comMixin],
		data() {
			return {
				billEnCode: 'WF_ExpenseExpenditureNo',
				dataForm: {
					flowTitle: '',
					billNo: '',
					flowUrgent: 1,
					applyUser: '',
					department: '',
					contractNum: '',
					accountOpeningBank: '',
					applyDate: '',
					openAccount: '',
					description: '',
					total: '',
					nonContract: '',
					amountPayment: '',
					paymentMethod: ''
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
						trigger: 'change',
					}],
					paymentMethod: [{
						required: true,
						message: '支付方式不能为空',
						trigger: 'change'
					}]
				}
			}
		},
		methods: {
			selfInit(data) {
				this.dataForm.applyDate = new Date().getTime()
				this.dataForm.flowTitle = this.userInfo.userName + "的费用支出申请"
				this.dataForm.applyUser = this.userInfo.userName + '/' + this.userInfo.userAccount
				this.dataForm.department = this.userInfo.departmentName
			},
			beforeInit() {
				this.getPaymentMethodOptions()
			}
		}
	}
</script>

<style>

</style>
