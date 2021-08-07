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
				<u-form-item label="申请日期" prop="applyDate" v-if="judgeShow('applyDate')" required>
					<jnpf-date-time type="datetime" v-model="dataForm.applyDate" placeholder="请输入申请日期"
						:disabled="judgeWrite('applyDate')"></jnpf-date-time>
				</u-form-item>
				<u-form-item label="合同名称" prop="contractName" v-if="judgeShow('contractName')" required>
					<u-input v-model="dataForm.contractName" placeholder="请输入合同名称"
						:disabled="judgeWrite('contractName')"></u-input>
				</u-form-item>
				<u-form-item label="合同号" prop="contractNum" v-if="judgeShow('contractNum')">
					<u-input v-model="dataForm.contractNum" placeholder="请输入合同号" :disabled="judgeWrite('contractNum')">
					</u-input>
				</u-form-item>
				<u-form-item label="合同类型" prop="contractType" v-if="judgeShow('contractType')">
					<u-input v-model="dataForm.contractType" placeholder="请输入合同类型"
						:disabled="judgeWrite('contractType')"></u-input>
				</u-form-item>
				<u-form-item label="合同编号" prop="contractId" v-if="judgeShow('contractId')" required>
					<u-input v-model="dataForm.contractId" placeholder="请输入合同编号" :disabled="judgeWrite('contractId')">
					</u-input>
				</u-form-item>
				<u-form-item label="签署方(甲方)" prop="firstParty" v-if="judgeShow('firstParty')">
					<u-input v-model="dataForm.firstParty" placeholder="请输入签署方(甲方)"
						:disabled="judgeWrite('firstParty')"></u-input>
				</u-form-item>
				<u-form-item label="乙方" prop="secondParty" v-if="judgeShow('secondParty')">
					<u-input v-model="dataForm.secondParty" placeholder="请输入乙方" :disabled="judgeWrite('secondParty')">
					</u-input>
				</u-form-item>
				<u-form-item label="合作负责人" prop="personCharge" v-if="judgeShow('personCharge')">
					<u-input v-model="dataForm.personCharge" placeholder="请输入合作负责人"
						:disabled="judgeWrite('personCharge')"></u-input>
				</u-form-item>

				<u-form-item label="所属部门" prop="leadDepartment" v-if="judgeShow('leadDepartment')">
					<u-input v-model="dataForm.leadDepartment" placeholder="请输入所属部门"
						:disabled="judgeWrite('leadDepartment')"></u-input>
				</u-form-item>

				<u-form-item label="签订地区" prop="signArea" v-if="judgeShow('signArea')">
					<u-input v-model="dataForm.signArea" placeholder="请输入签订地区" :disabled="judgeWrite('signArea')">
					</u-input>
				</u-form-item>
				<u-form-item label="收入金额" prop="incomeAmount" v-if="judgeShow('incomeAmount')">
					<u-input v-model="dataForm.incomeAmount" placeholder="请输入收入金额"
						:disabled="judgeWrite('incomeAmount')"></u-input>
				</u-form-item>
				<u-form-item label="支出总额" prop="totalExpenditure" v-if="judgeShow('totalExpenditure')">
					<u-input v-model="dataForm.totalExpenditure" placeholder="请输入支出总额"
						:disabled="judgeWrite('totalExpenditure')"></u-input>
				</u-form-item>
				<u-form-item label="合同期限" prop="contractPeriod" v-if="judgeShow('contractPeriod')">
					<u-input v-model="dataForm.contractPeriod" placeholder="请输入合同期限"
						:disabled="judgeWrite('contractPeriod')"></u-input>
				</u-form-item>
				<u-form-item label="结算方式" prop="paymentMethod" v-if="judgeShow('paymentMethod')" required>
					<jnpf-select v-model="dataForm.paymentMethod" placeholder="请选择结算方式" :options="paymentMethodOptions"
						:props="payProps" :disabled="judgeWrite('paymentMethod')"></jnpf-select>
				</u-form-item>
				<u-form-item label="预算批付" prop="budgetaryApproval" v-if="judgeShow('budgetaryApproval')">
					<u-input v-model="dataForm.budgetaryApproval" placeholder="请输入预算批付"
						:disabled="judgeWrite('budgetaryApproval')"></u-input>
				</u-form-item>
				<u-form-item label="开始时间" prop="startContractDate" v-if="judgeShow('startContractDate')" required>
					<jnpf-date-time type="datetime" v-model="dataForm.startContractDate" placeholder="开始时间"
						:disabled="judgeWrite('startContractDate')"></jnpf-date-time>
				</u-form-item>
				<u-form-item label="结束时间" prop="endContractDate" v-if="judgeShow('endContractDate')" required>
					<jnpf-date-time type="datetime" v-model="dataForm.endContractDate" placeholder="结束时间"
						:disabled="judgeWrite('endContractDate')"></jnpf-date-time>
				</u-form-item>
				<u-form-item label="相关附件" prop="fileJson" v-if="judgeShow('fileJson')">
					<jnpf-file :list="fileList" :disabled="judgeWrite('fileJson')" />
				</u-form-item>
				<u-form-item label="内容简要" prop="contractContent" v-if="judgeShow('contractContent')">
					<u-input v-model="dataForm.contractContent" placeholder="请输入内容简要" type="textarea"
						:disabled="judgeWrite('contractContent')"></u-input>
				</u-form-item>

			</view>
		</u-form>
	</view>
</template>

<script>
	import comMixin from '../mixin'
	export default {
		name: 'ContractApprovalSheet',
		mixins: [comMixin],
		data() {
			return {
				billEnCode: 'WF_ContractApprovalSheetNo',
				dataForm: {
					flowTitle: '',
					billNo: '',
					flowUrgent: 1,
					applyUser: '',
					contractNum: '',
					firstParty: '',
					secondParty: '',
					leadDepartment: '',
					fileJson: [],
					contractName: '',
					signArea: '',
					contractType: '',
					contractId: '',
					contractContent: '',
					contractPeriod: '',
					startContractDate: '',
					endContractDate: '',
					totalExpenditure: '',
					personCharge: '',
					budgetaryApproval: '',
					applyDate: '',
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
					applyDate: [{
						required: true,
						message: '申请时间不能为空',
						trigger: 'change',
						type: 'number'
					}],
					startContractDate: [{
						required: true,
						message: '开始时间不能为空',
						trigger: 'change',
						type: 'number'
					}],
					endContractDate: [{
						required: true,
						message: '结束时间不能为空',
						trigger: 'change',
						type: 'number'
					}],
					contractName: [{
						required: true,
						message: '合同名称不能为空',
						trigger: 'change',
					}],
					paymentMethod:[{
						required: true,
						message: '结算方式不能为空',
						trigger: 'change'
					}],
					contractId: [{
						required: true,
						message: '合同编号不能为空',
						trigger: 'change',
						type: 'number'
					}]
				}
			}
		},
		methods: {
			selfInit(data) {
				this.dataForm.applyDate = new Date().getTime()
				this.dataForm.flowTitle = this.userInfo.userName + "的合同申请"
				this.dataForm.applyUser = this.userInfo.userName + '/' + this.userInfo.userAccount;
			},
			beforeInit() {
				this.getPaymentMethodOptions()
			}
		}
	}
</script>

<style>

</style>
