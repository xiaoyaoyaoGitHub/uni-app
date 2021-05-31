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
				<u-form-item label="开票人" prop="drawer" v-if="judgeShow('drawer')" required>
					<u-input v-model="dataForm.drawer" placeholder="请输入开票人"></u-input>
				</u-form-item>
				<u-form-item label="开票日期" prop="billDate" v-if="judgeShow('billDate')" required>
					<jnpf-date-time type="date" v-model="dataForm.billDate" placeholder="请输入开票日期"></jnpf-date-time>
				</u-form-item>
				<u-form-item label="公司名称" prop="companyName" v-if="judgeShow('companyName')">
					<u-input v-model="dataForm.companyName" placeholder="请输入公司名称"></u-input>
				</u-form-item>
				<u-form-item label="关联名称" prop="conName" v-if="judgeShow('conName')">
					<u-input v-model="dataForm.conName" placeholder="请输入关联名称"></u-input>
				</u-form-item>
				<u-form-item label="开户银行" prop="bank" v-if="judgeShow('bank')">
					<u-input v-model="dataForm.bank" placeholder="请输入开户银行"></u-input>
				</u-form-item>
				<u-form-item label="开户账号" prop="amount" v-if="judgeShow('amount')">
					<u-input v-model="dataForm.amount" placeholder="请输入开户账号"></u-input>
				</u-form-item>
				
				<u-form-item label="开票金额" prop="billAmount" v-if="judgeShow('billAmount')">
					<u-input v-model="dataForm.billAmount" placeholder="请输入开票金额"></u-input>
				</u-form-item>
				<u-form-item label="税号" prop="taxId" v-if="judgeShow('taxId')">
					<u-input v-model="dataForm.taxId" placeholder="请输入税号"></u-input>
				</u-form-item>
				<u-form-item label="发票号" prop="invoiceId" v-if="judgeShow('invoiceId')">
					<u-input v-model="dataForm.invoiceId" placeholder="请输入发票号"></u-input>
				</u-form-item>
				<u-form-item label="付款金额" prop="payAmount" v-if="judgeShow('payAmount')">
					<u-input v-model="dataForm.payAmount" placeholder="请输入付款金额"></u-input>
				</u-form-item>
				<u-form-item label="发票地址" prop="invoAddress" v-if="judgeShow('invoAddress')">
					<u-input v-model="dataForm.invoAddress" placeholder="请输入发票地址"></u-input>
				</u-form-item>
				<u-form-item label="相关附件" prop="fileList" v-if="judgeShow('fileList')">
					<jnpf-upload v-model="dataForm.fileList"></jnpf-upload>
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
		name: 'ConBilling',
		mixins: [comMixin],
		data() {
			return {
				billEnCode: 'WF_ConBillingNo',
				dataForm: {
					flowTitle: '',
					billNo:'',
					flowUrgent:1,
					drawer:'',
					companyName:'',
					conName:'',
					bank:'',
					amount:'',
					billDate:'',
					billAmount:'',
					description:'',
					fileList:[],
					taxId:'',
					invoiceId:'',
					payAmount:'',
					invoAddress:''
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
					billDate:[{
						required: true,
						message: '发文日期不能为空',
						trigger: 'change',
						type:'number'
					}]
				}
			}
		},
		methods: {
			selfInit(data) {
				this.dataForm.flowTitle = this.userInfo.userName + "的合同开票申请"
			}
		}
	}
</script>

<style>

</style>
