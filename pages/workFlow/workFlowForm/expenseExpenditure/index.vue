<template>
	<view class="jnpf-wrap jnpf-wrap-workflow">
		<u-form :model="dataForm" :rules="rules" ref="dataForm" :errorType="['toast']" label-position="left"
			label-width="150" label-align="left">
			<u-form-item label="流程标题" prop="flowTitle" required>
				<u-input v-model="dataForm.flowTitle" placeholder="流程标题"></u-input>
			</u-form-item>
			<u-form-item label="流程编码" prop="billNo" v-if="judgeShow('billNo')" required>
				<u-input v-model="dataForm.billNo" placeholder="流程编码" disabled></u-input>
			</u-form-item>
			<u-form-item label="紧急程度" prop="flowUrgent" required>
				<jnpf-select v-model="dataForm.flowUrgent" placeholder="请选择紧急程度" :options="flowUrgentOptions">
				</jnpf-select>
			</u-form-item>
			
			<view class="jnpf-card">
				<u-form-item label="申请人员" prop="applyUser" v-if="judgeShow('applyUser')">
					<u-input v-model="dataForm.applyUser" placeholder="请输入申请人员"></u-input>
				</u-form-item>
				<u-form-item label="申请部门" prop="position" v-if="judgeShow('position')">
					<u-input v-model="dataForm.position" placeholder="请输入申请部门"></u-input>
				</u-form-item>
				<u-form-item label="申请日期" prop="applyDate" v-if="judgeShow('applyDate')">
					<jnpf-date-time type="date" v-model="dataForm.applyDate" placeholder="请输入申请日期"></jnpf-date-time>
				</u-form-item>
				
				<u-form-item label="合同编号" prop="contractNum" v-if="judgeShow('contractNum')">
					<u-input v-model="dataForm.contractNum" placeholder="请输入合同编号"></u-input>
				</u-form-item>
				<u-form-item label="非合同支出" prop="nonContract" v-if="judgeShow('nonContract')">
					<u-input v-model="dataForm.nonContract" placeholder="请输入非合同支出"></u-input>
				</u-form-item>
				<u-form-item label="开户银行" prop="accountOpeningBank" v-if="judgeShow('accountOpeningBank')">
					<u-input v-model="dataForm.accountOpeningBank" placeholder="请输入开户银行"></u-input>
				</u-form-item>
				<u-form-item label="开户账号" prop="bankAccount" v-if="judgeShow('bankAccount')">
					<u-input v-model="dataForm.bankAccount" placeholder="请输入开户账号"></u-input>
				</u-form-item>
				
				<u-form-item label="开户姓名" prop="openAccount" v-if="judgeShow('openAccount')">
					<u-input v-model="dataForm.openAccount" placeholder="请输入开户姓名"></u-input>
				</u-form-item>
				<u-form-item label="合计费用" prop="total" v-if="judgeShow('total')">
					<u-input v-model="dataForm.total" placeholder="请输入合计费用"></u-input>
				</u-form-item>
				<u-form-item label="支付方式" prop="paymentMethod" v-if="judgeShow('paymentMethod')" required>
					<jnpf-select v-model="dataForm.paymentMethod" placeholder="请选择支付方式" :options="paymentMethodOptions"></jnpf-select>
				</u-form-item>
				<u-form-item label="支付金额" prop="amountPayment" v-if="judgeShow('amountPayment')">
					<u-input v-model="dataForm.amountPayment" placeholder="请输入支付金额"></u-input>
				</u-form-item>
				<u-form-item label="备注" prop="description" v-if="judgeShow('description')">
					<u-input v-model="dataForm.description" placeholder="请输入备注" type="textarea"></u-input>
				</u-form-item>
			</view>
		</u-form>
	</view>
</template>

<script>
	import comMixin from '../mixin'
	export default {
		name: 'ExpenseExpenditureNo',
		mixins: [comMixin],
		data() {
			return {
				billEnCode: 'WF_ExpenseExpenditureNo',
				dataForm: {
					flowTitle: '',
					billNo:'',
					flowUrgent:1,
					applyUser:'',
					position:'',
					contractNum:'',
					accountOpeningBank:'',
					applyDate:'',
					openAccount:'',
					description:'',
					total:'',
					nonContract:'',
					amountPayment:'',
					paymentMethod:''
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
					paymentMethod:[{
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
				if (this.userInfo.positionIds && this.userInfo.positionIds.length) {
					let list = this.userInfo.positionIds.map(o => o.name)
					this.dataForm.position = list.join(',')
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
