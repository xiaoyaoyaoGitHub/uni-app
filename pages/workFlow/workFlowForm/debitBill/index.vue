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
				<u-form-item label="所属部门" prop="departmental" v-if="judgeShow('departmental')">
					<u-input v-model="dataForm.departmental" placeholder="请输入所属部门"
						:disabled="judgeWrite('departmental')"></u-input>
				</u-form-item>
				<u-form-item label="申请日期" prop="applyDate" v-if="judgeShow('applyDate')">
					<cudt-date-time type="date" v-model="dataForm.applyDate" placeholder="请输入申请日期"
						:disabled="judgeWrite('applyDate')"></cudt-date-time>
				</u-form-item>
				<u-form-item label="员工姓名" prop="staffName" v-if="judgeShow('staffName')">
					<u-input v-model="dataForm.staffName" placeholder="请输入员工姓名" :disabled="judgeWrite('staffName')">
					</u-input>
				</u-form-item>
				<u-form-item label="员工职务" prop="staffPost" v-if="judgeShow('staffPost')">
					<u-input v-model="dataForm.staffPost" placeholder="请输入员工职务" :disabled="judgeWrite('staffPost')">
					</u-input>
				</u-form-item>
				<u-form-item label="员工编码" prop="staffId" v-if="judgeShow('staffId')" required>
					<u-input v-model="dataForm.staffId" placeholder="请输入员工编码" :disabled="judgeWrite('staffId')">
					</u-input>
				</u-form-item>
			</view>
			<view class="cudt-card">
				<u-form-item label="借款方式" prop="loanMode" v-if="judgeShow('loanMode')" required>
					<u-input v-model="dataForm.loanMode" placeholder="请输入借款方式" :disabled="judgeWrite('loanMode')">
					</u-input>
				</u-form-item>
				<u-form-item label="转账账户" prop="transferAccount" v-if="judgeShow('transferAccount')">
					<u-input v-model="dataForm.transferAccount" placeholder="请输入转账账户"
						:disabled="judgeWrite('transferAccount')"></u-input>
				</u-form-item>
				<u-form-item label="支付方式" prop="paymentMethod" v-if="judgeShow('paymentMethod')" required>
					<cudt-select v-model="dataForm.paymentMethod" placeholder="请选择支付方式" :options="paymentMethodOptions"
						:disabled="judgeWrite('paymentMethod')" :props="payProps"></cudt-select>
				</u-form-item>
				<u-form-item label="借支金额" prop="amountDebit" v-if="judgeShow('amountDebit')">
					<u-input v-model="dataForm.amountDebit" placeholder="请输入借支金额" :disabled="judgeWrite('amountDebit')">
					</u-input>
				</u-form-item>
				<u-form-item label="还款票据" prop="repaymentBill" v-if="judgeShow('repaymentBill')">
					<u-input v-model="dataForm.repaymentBill" placeholder="请输入还款票据"
						:disabled="judgeWrite('repaymentBill')"></u-input>
				</u-form-item>
				<u-form-item label="还款日期" prop="teachingDate" v-if="judgeShow('teachingDate')">
					<cudt-date-time type="datetime" v-model="dataForm.teachingDate" placeholder="还款日期"
						:disabled="judgeWrite('teachingDate')"></cudt-date-time>
				</u-form-item>
				<u-form-item label="借款原因" prop="reason" v-if="judgeShow('reason')">
					<u-input v-model="dataForm.reason" placeholder="请输入借款原因" type="textarea"
						:disabled="judgeWrite('reason')"></u-input>
				</u-form-item>
			</view>
		</u-form>
	</view>
</template>

<script>
	import comMixin from '../mixin'
	export default {
		name: 'DebitBill',
		mixins: [comMixin],
		data() {
			return {
				billEnCode: 'WF_DebitBillNo',
				dataForm: {
					flowTitle: '',
					billNo: '',
					flowUrgent: 1,
					staffName: '',
					staffPost: '',
					transferAccount: '',
					repaymentBill: '',
					departmental: '',
					staffId: '',
					loanMode: '',
					reason: '',
					teachingDate: '',
					applyDate: '',
					paymentMethod: '',
					amountDebit: ''
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
					staffId: [{
						required: true,
						message: '员工编码不能为空',
						trigger: 'change',
					}],
					paymentMethod: [{
						required: true,
						message: '支付方式不能为空',
						trigger: 'change',
					}]
				}
			}
		},
		methods: {
			selfInit(data) {
				this.dataForm.applyDate = new Date().getTime()
				this.dataForm.flowTitle = this.userInfo.userName + "的借支申请"
				this.dataForm.staffName = this.userInfo.userName + '/' + this.userInfo.userAccount
				this.dataForm.departmental = this.userInfo.departmentName
				if (this.userInfo.positionIds && this.userInfo.positionIds.length) {
					let list = this.userInfo.positionIds.map(o => o.name)
					this.dataForm.staffPost = list.join(',')
				}
			},
			beforeInit() {
				this.getPaymentMethodOptions()
			}
		}
	}
</script>

<style>

</style>
