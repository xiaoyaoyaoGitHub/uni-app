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
				<u-form-item label="甲方单位" prop="firstPartyUnit" v-if="judgeShow('firstPartyUnit')">
					<u-input v-model="dataForm.firstPartyUnit" placeholder="请输入甲方单位"
						:disabled="judgeWrite('firstPartyUnit')"></u-input>
				</u-form-item>
				<u-form-item label="甲方负责人" prop="firstPartyPerson" v-if="judgeShow('firstPartyPerson')">
					<u-input v-model="dataForm.firstPartyPerson" placeholder="请输入甲方负责人"
						:disabled="judgeWrite('firstPartyPerson')"></u-input>
				</u-form-item>
				<u-form-item label="甲方联系方式" prop="firstPartyContact" v-if="judgeShow('firstPartyContact')">
					<u-input v-model="dataForm.firstPartyContact" placeholder="请输入甲方联系方式"
						:disabled="judgeWrite('firstPartyContact')"></u-input>
				</u-form-item>
				<u-form-item label="乙方单位" prop="secondPartyUnit" v-if="judgeShow('secondPartyUnit')">
					<u-input v-model="dataForm.secondPartyUnit" placeholder="请输入乙方单位"
						:disabled="judgeWrite('secondPartyUnit')"></u-input>
				</u-form-item>
				<u-form-item label="乙方负责人" prop="secondPartyPerson" v-if="judgeShow('secondPartyPerson')">
					<u-input v-model="dataForm.secondPartyPerson" placeholder="请输入乙方负责人"
						:disabled="judgeWrite('secondPartyPerson')"></u-input>
				</u-form-item>
				<u-form-item label="乙方联系方式" prop="secondPartyContact" v-if="judgeShow('secondPartyContact')">
					<u-input v-model="dataForm.secondPartyContact" placeholder="请输入乙方联系方式"
						:disabled="judgeWrite('secondPartyContact')"></u-input>
				</u-form-item>
				<u-form-item label="合同名称" prop="contractName" v-if="judgeShow('contractName')" required>
					<u-input v-model="dataForm.contractName" placeholder="请输入合同名称"
						:disabled="judgeWrite('contractName')"></u-input>
				</u-form-item>
				<u-form-item label="合同分类" prop="contractClass" v-if="judgeShow('contractClass')">
					<u-input v-model="dataForm.contractClass" placeholder="请输入合同分类"
						:disabled="judgeWrite('contractClass')"></u-input>
				</u-form-item>
				<u-form-item label="合同类型" prop="contractType" v-if="judgeShow('contractType')">
					<u-input v-model="dataForm.contractType" placeholder="请输入合同类型"
						:disabled="judgeWrite('contractType')"></u-input>
				</u-form-item>
				<u-form-item label="合同编号" prop="contractId" v-if="judgeShow('contractId')" required>
					<u-input v-model="dataForm.contractId" placeholder="请输入合同编号" :disabled="judgeWrite('contractId')">
					</u-input>
				</u-form-item>
				<u-form-item label="业务人员" prop="businessPerson" v-if="judgeShow('businessPerson')">
					<u-input v-model="dataForm.businessPerson" placeholder="请输入业务人员"
						:disabled="judgeWrite('businessPerson')"></u-input>
				</u-form-item>
				<u-form-item label="签约时间" prop="signingDate" v-if="judgeShow('signingDate')" required>
					<cudt-date-time type="datetime" v-model="dataForm.signingDate" placeholder="请输入签约时间"
						:disabled="judgeWrite('signingDate')"></cudt-date-time>
				</u-form-item>
				<u-form-item label="开始时间" prop="startDate" v-if="judgeShow('startDate')" required>
					<cudt-date-time type="datetime" v-model="dataForm.startDate" placeholder="开始时间"
						:disabled="judgeWrite('startDate')"></cudt-date-time>
				</u-form-item>
				<u-form-item label="结束时间" prop="endDate" v-if="judgeShow('endDate')" required>
					<cudt-date-time type="datetime" v-model="dataForm.endDate" placeholder="结束时间"
						:disabled="judgeWrite('endDate')"></cudt-date-time>
				</u-form-item>
				<u-form-item label="收入金额" prop="incomeAmount" v-if="judgeShow('incomeAmount')">
					<u-number-box v-model="dataForm.incomeAmount" :min="0" :max="100" :step="1"
						:input-width="120" :positive-integer="false" :input-height="60"
						:disabled="judgeWrite('incomeAmount')"></u-number-box>
				</u-form-item>
				<u-form-item label="填写人员" prop="inputPerson" v-if="judgeShow('inputPerson')">
					<u-input v-model="dataForm.inputPerson" placeholder="请输入填写人员" :disabled="judgeWrite('inputPerson')">
					</u-input>
				</u-form-item>
				<u-form-item label="相关附件" prop="fileJson" v-if="judgeShow('fileJson')">
					<cudt-file :list="fileList" :disabled="judgeWrite('fileJson')" />
				</u-form-item>
				<u-form-item label="主要内容" prop="primaryCoverage" v-if="judgeShow('primaryCoverage')">
					<u-input v-model="dataForm.primaryCoverage" placeholder="请输入主要内容" type="textarea"
						:disabled="judgeWrite('primaryCoverage')"></u-input>
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
		name: 'ContractApproval',
		mixins: [comMixin],
		data() {
			return {
				billEnCode: 'WF_ContractApprovalNo',
				dataForm: {
					flowTitle: '',
					billNo: '',
					flowUrgent: 1,
					firstPartyUnit: '',
					firstPartyPerson: '',
					firstPartyContact: '',
					secondPartyUnit: '',
					signingDate: '',
					secondPartyContact: '',
					description: '',
					fileJson: '',
					contractName: '',
					contractClass: '',
					contractType: '',
					contractId: '',
					primaryCoverage: '',
					inputPerson: '',
					startDate: '',
					endDate: '',
					businessPerson: '',
					secondPartyPerson: '',
					incomeAmount:0
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
					signingDate: [{
						required: true,
						message: '签约时间不能为空',
						trigger: 'change',
						type: 'number'
					}],
					startDate: [{
						required: true,
						message: '开始时间不能为空',
						trigger: 'change',
						type: 'number'
					}],
					endDate: [{
						required: true,
						message: '结束时间不能为空',
						trigger: 'change',
						type: 'number'
					}],
					contractId: [{
						required: true,
						message: '合同编号不能为空',
						trigger: 'change',
						type: 'number'
					}],
					contractName: [{
						required: true,
						message: '合同名称不能为空',
						trigger: 'change'
					}],
					firstPartyContact:[{
						pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
						message: '手机号码不正确',
						type: 'string',
						trigger: ['change', 'blur'],
					}],
					secondPartyContact:[{
						pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
						message: '手机号码不正确',
						type: 'string',
						trigger: ['change', 'blur'],
					}],
				}
			}
		},
		methods: {
			selfInit(data) {
				this.dataForm.applyDate = new Date().getTime()
				this.dataForm.flowTitle = this.userInfo.userName + "的合同审批申请"
				this.dataForm.applyUser = this.userInfo.userName + '/' + this.userInfo.userAccount
				if (this.userInfo.positionIds && this.userInfo.positionIds.length) {
					let list = this.userInfo.positionIds.map(o => o.name)
					this.dataForm.position = list.join(',')
				}
			}
		}
	}
</script>

<style>

</style>
