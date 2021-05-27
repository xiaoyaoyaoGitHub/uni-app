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
				<u-form-item label="所属部门" prop="position" v-if="judgeShow('position')" required>
					<u-input v-model="dataForm.position" placeholder="请输入所属部门"></u-input>
				</u-form-item>
				<u-form-item label="申请日期" prop="applyDate" v-if="judgeShow('applyDate')" required>
					<jnpf-date-time type="date" v-model="dataForm.applyDate" placeholder="请输入申请日期" disabled></jnpf-date-time>
				</u-form-item>
				<u-form-item label="员工姓名" prop="staffName" v-if="judgeShow('staffName')">
					<u-input v-model="dataForm.staffName" placeholder="请输入员工姓名" disabled></u-input>
				</u-form-item>
				<u-form-item label="员工职务" prop="staffPost" v-if="judgeShow('staffPost')">
					<u-input v-model="dataForm.staffPost" placeholder="请输入员工职务"></u-input>
				</u-form-item>
				<u-form-item label="员工编码" prop="staffId" v-if="judgeShow('staffId')">
					<u-input v-model="dataForm.staffId" placeholder="请输入员工编码"></u-input>
				</u-form-item>
			</view>
			<view class="jnpf-card">
				<u-form-item label="借款方式" prop="loanMode" v-if="judgeShow('loanMode')" required>
					<u-input v-model="dataForm.loanMode" placeholder="请输入借款方式"></u-input>
				</u-form-item>
				<u-form-item label="转账账户" prop="transferAccount" v-if="judgeShow('transferAccount')">
					<u-input v-model="dataForm.transferAccount" placeholder="请输入转账账户"></u-input>
				</u-form-item>
				<u-form-item label="支付方式" prop="paymentMethod" v-if="judgeShow('paymentMethod')">
					<jnpf-select v-model="dataForm.paymentMethod" placeholder="请选择支付方式" :options="paymentMethodOptions"></jnpf-select>
				</u-form-item>
				<u-form-item label="借支金额" prop="amountDebit" v-if="judgeShow('amountDebit')">
					<u-input v-model="dataForm.amountDebit" placeholder="请输入借支金额"></u-input>
				</u-form-item>
				<u-form-item label="还款票据" prop="repaymentBill" v-if="judgeShow('repaymentBill')">
					<u-input v-model="dataForm.repaymentBill" placeholder="请输入还款票据"></u-input>
				</u-form-item>
				<u-form-item label="还款日期" prop="teachingDate" v-if="judgeShow('teachingDate')" required>
					<jnpf-date-time type="date" v-model="dataForm.teachingDate" placeholder="还款日期"></jnpf-date-time>
				</u-form-item>
				<u-form-item label="借款原因" prop="reason" v-if="judgeShow('reason')">
					<u-input v-model="dataForm.reason" placeholder="请输入借款原因" type="textarea"></u-input>
				</u-form-item>
			</view>
		</u-form>
	</view>
</template>

<script>
	import comMixin from '../mixin'
	export default {
		name: 'DebitBillNo',
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
					position: '',
					staffId: '',
					loanMode: '',
					reason: '',
					teachingDate: '',
					applyDate:'',
					paymentMethod:'',
					amountDebit:''
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
					applyDate: [{
						required: true,
						message: '申请时间不能为空',
						trigger: 'change',
						type: 'number'
					}],
					teachingDate: [{
						required: true,
						message: '还款日期不能为空',
						trigger: 'change',
						type: 'number'
					}],
					staffId: [{
						required: true,
						message: '员工编码不能为空',
						trigger: 'change',
					}]
				}
			}
		},
		methods: {
			selfInit(data) {
				this.dataForm.applyDate = new Date().getTime()
				this.dataForm.flowTitle = this.userInfo.userName + "的合同申请"
				this.dataForm.applyUser = this.userInfo.userName + '/' + this.userInfo.userAccount
				if (this.userInfo.positionIds && this.userInfo.positionIds.length) {
					let list = this.userInfo.positionIds.map(o => o.name)
					this.dataForm.position = list.join(',')
				}
			},
		}
	}
</script>

<style>

</style>
