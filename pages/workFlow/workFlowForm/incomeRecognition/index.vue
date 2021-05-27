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
				<u-form-item label="结算月份" prop="settlementMonth" v-if="judgeShow('settlementMonth')" required>
					<u-input v-model="dataForm.settlementMonth" placeholder="请输入结算月份"></u-input>
				</u-form-item>
				<u-form-item label="客户名称" prop="customerName" v-if="judgeShow('customerName')" required>
					<u-input v-model="dataForm.customerName" placeholder="请输入客户名称"></u-input>
				</u-form-item>
				
				
				<u-form-item label="合同编号" prop="contractNum" v-if="judgeShow('contractNum')" required>
					<u-input v-model="dataForm.contractNum" placeholder="请输入合同编号"></u-input>
				</u-form-item>
				<u-form-item label="合同总金额" prop="totalAmount" v-if="judgeShow('totalAmount')">
					<u-input v-model="dataForm.totalAmount" placeholder="请输入合同总金额" type="number"></u-input>
				</u-form-item>
				<u-form-item label="到款银行" prop="moneyBank" v-if="judgeShow('moneyBank')" required>
					<u-input v-model="dataForm.moneyBank" placeholder="请输入到款银行"></u-input>
				</u-form-item>
				<u-form-item label="到款金额" prop="actualAmount" v-if="judgeShow('actualAmount')">
					<u-input v-model="dataForm.actualAmount" placeholder="请输入到款金额" type="number"></u-input>
				</u-form-item>
				<u-form-item label="到款日期" prop="paymentDate" v-if="judgeShow('paymentDate')" required>
					<jnpf-date-time type="date" v-model="dataForm.paymentDate" placeholder="请输入到款日期"></jnpf-date-time>
				</u-form-item>
				<u-form-item label="联系人姓名" prop="contactName" v-if="judgeShow('contactName')" required>
					<u-input v-model="dataForm.contactName" placeholder="请输入联系人姓名"></u-input>
				</u-form-item>
				<u-form-item label="联系电话" prop="contacPhone" v-if="judgeShow('contacPhone')" required>
					<u-input v-model="dataForm.contacPhone" placeholder="请输入联系电话" type="number"></u-input>
				</u-form-item>
				<u-form-item label="联系QQ" prop="contactQQ" v-if="judgeShow('contactQQ')">
					<u-input v-model="dataForm.contactQQ" placeholder="请输入联系QQ" type="number"></u-input>
				</u-form-item>
				<u-form-item label="未付金额" prop="unpaidAmount" v-if="judgeShow('unpaidAmount')">
					<u-input v-model="dataForm.unpaidAmount" placeholder="请输入未付金额" type="number"></u-input>
				</u-form-item>
				<u-form-item label="已付金额" prop="amountPaid" v-if="judgeShow('amountPaid')">
					<u-input v-model="dataForm.amountPaid" placeholder="请输入已付金额" type="number"></u-input>
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
		name: 'IncomeRecognitionNo',
		mixins: [comMixin],
		data() {
			return {
				billEnCode: 'WF_IncomeRecognitionNo',
				dataForm: {
					flowTitle: '',
					billNo:'',
					flowUrgent:1,
					settlementMonth:'',
					contacPhone:'',
					contractNum:'',
					moneyBank:'',
					actualAmount:'',
					contactName:'',
					description:'',
					paymentDate:'',
					totalAmount:'',
					contactQQ:'',
					unpaidAmount:'',
					amountPaid:'',
					customerName:''
					
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
					contacPhone: [{
						pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
						message: '手机号码不正确',
						trigger: ['blur'],
					}],
					settlementMonth:[{
						required: true,
						message: '结算月份不能为空',
						trigger: 'blur',
					}],
					customerName:[{
						required: true,
						message: '客户名称不能为空',
						trigger: 'blur',
					}],
					contractNum:[{
						required: true,
						message: '合同编码不能为空',
						trigger: 'blur',
					}],
					moneyBank:[{
						required: true,
						message: '到款银行不能为空',
						trigger: 'blur',
					}],
					paymentDate:[{
						required: true,
						message: '到款日期不能为空',
						trigger: 'blur',
						type:'number'
					}],
				}
			}
		},
		methods: {
			selfInit(data) {
				this.dataForm.applyDate = new Date().getTime()
				this.dataForm.flowTitle = this.userInfo.userName + "的收入确认表"
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
