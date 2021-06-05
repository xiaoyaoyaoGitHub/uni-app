<template>
	<view class="jnpf-wrap jnpf-wrap-workflow">
		<u-form :model="dataForm" :rules="rules" ref="dataForm" :errorType="['toast']" label-department="left"
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
				<u-form-item label="所属月份" prop="month" v-if="judgeShow('month')">
					<u-input v-model="dataForm.month" placeholder="请输入所属月份" :disabled="judgeWrite('month')"></u-input>
				</u-form-item>
				<u-form-item label="发放单位" prop="issuingUnit" v-if="judgeShow('issuingUnit')">
					<u-input v-model="dataForm.issuingUnit" placeholder="请输入发放单位" :disabled="judgeWrite('issuingUnit')">
					</u-input>
				</u-form-item>
				<u-form-item label="员工部门" prop="department" v-if="judgeShow('department')">
					<u-input v-model="dataForm.department" placeholder="请输入员工部门" :disabled="judgeWrite('department')">
					</u-input>
				</u-form-item>
				<u-form-item label="员工职位" prop="position" v-if="judgeShow('position')">
					<u-input v-model="dataForm.position" placeholder="请输入员工职位" :disabled="judgeWrite('position')">
					</u-input>
				</u-form-item>
				<u-form-item label="出勤天数" prop="actualAttendance" v-if="judgeShow('actualAttendance')">
					<u-input v-model="dataForm.actualAttendance" placeholder="请输入出勤天数" type="number"
						:disabled="judgeWrite('actualAttendance')"></u-input>
				</u-form-item>
			</view>
			<u-form-item label="基本薪资" prop="baseSalary" v-if="judgeShow('baseSalary')">
				<u-input v-model="dataForm.baseSalary" placeholder="请输入基本薪资" type="number"
					:disabled="judgeWrite('baseSalary')"></u-input>
			</u-form-item>
			<u-form-item label="员工津贴" prop="allowance" v-if="judgeShow('allowance')">
				<u-input v-model="dataForm.allowance" placeholder="请输入员工津贴" type="number"
					:disabled="judgeWrite('allowance')"></u-input>
			</u-form-item>
			<u-form-item label="员工保险" prop="insurance" v-if="judgeShow('insurance')">
				<u-input v-model="dataForm.insurance" placeholder="请输入员工保险" type="number"
					:disabled="judgeWrite('insurance')"></u-input>
			</u-form-item>
			<u-form-item label="所得税" prop="incomeTax" v-if="judgeShow('incomeTax')">
				<u-input v-model="dataForm.incomeTax" placeholder="请输入所得税" type="number"
					:disabled="judgeWrite('incomeTax')"></u-input>
			</u-form-item>
			<u-form-item label="员工绩效" prop="performance" v-if="judgeShow('performance')">
				<u-input v-model="dataForm.performance" placeholder="请输入员工绩效" type="number"
					:disabled="judgeWrite('performance')"></u-input>
			</u-form-item>
			<u-form-item label="加班费用" prop="overtimePay" v-if="judgeShow('overtimePay')">
				<u-input v-model="dataForm.overtimePay" placeholder="请输入加班费用" type="number"
					:disabled="judgeWrite('overtimePay')"></u-input>
			</u-form-item>
			<u-form-item label="应发工资" prop="grossPay" v-if="judgeShow('grossPay')">
				<u-input v-model="dataForm.grossPay" placeholder="请输入应发工资" type="number"
					:disabled="judgeWrite('grossPay')"></u-input>
			</u-form-item>
			<u-form-item label="实发工资" prop="payroll" v-if="judgeShow('payroll')">
				<u-input v-model="dataForm.payroll" placeholder="请输入实发工资" type="number"
					:disabled="judgeWrite('payroll')"></u-input>
			</u-form-item>
			<u-form-item label="备注" prop="description" v-if="judgeShow('description')">
				<u-input v-model="dataForm.description" placeholder="请输入备注" type="textarea"
					:disabled="judgeWrite('description')"></u-input>
			</u-form-item>
		</u-form>
	</view>
</template>

<script>
	import comMixin from '../mixin'
	export default {
		name: 'PayDistribution',
		mixins: [comMixin],
		data() {
			return {
				billEnCode: 'WF_PayDistributionNo',
				dataForm: {
					flowTitle: '',
					billNo: '',
					flowUrgent: 1,
					month: '',
					issuingUnit: '',
					department: '',
					department: '',
					position: '',
					baseSalary: '',
					actualAttendance: '',
					allowance: '',
					incomeTax: '',
					insurance: '',
					performance: '',
					overtimePay: '',
					grossPay: '',
					payroll: '',
					description: ''
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
						message: '编码不能为空',
						trigger: 'change',
						type: 'string'
					}],
					actualAttendance: [{
						required: true,
						message: '出勤天数不能为空',
						trigger: 'change',
						type: 'number'
					}],
					baseSalary: [{
						required: true,
						message: '基本薪资不能为空',
						trigger: 'change',
						type: 'number'
					}],
					allowance: [{
						required: true,
						message: '津贴不能为空',
						trigger: 'change',
						type: 'number'
					}],
					incomeTax: [{
						required: true,
						message: '所得税不能为空',
						trigger: 'change',
						type: 'number'
					}],
					insurance: [{
						required: true,
						message: '保险不能为空',
						trigger: 'change',
						type: 'number'
					}],
					performance: [{
						required: true,
						message: '绩效不能为空',
						trigger: 'change',
						type: 'number'
					}],
					overtimePay: [{
						required: true,
						message: '加班费不能为空',
						trigger: 'change',
						type: 'number'
					}],
					grossPay: [{
						required: true,
						message: '应发工资不能为空',
						trigger: 'change',
						type: 'number'
					}],
					payroll: [{
						required: true,
						message: '实发工资不能为空',
						trigger: 'change',
						type: 'number'
					}],
				},
			}
		},
		methods: {
			selfInit(data) {
				this.dataForm.flowTitle = this.userInfo.userName + "的薪酬发放"
			}
		}
	}
</script>
