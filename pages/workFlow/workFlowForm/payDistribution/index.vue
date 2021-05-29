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
				<u-form-item label="所属月份" prop="month" v-if="judgeShow('month')">
					<jnpf-date-time type="date" v-model="dataForm.month" placeholder="请选择所属月份"></jnpf-date-time>
				</u-form-item>
				<u-form-item label="发放单位" prop="issuingUnit" v-if="judgeShow('issuingUnit')">
					<u-input v-model="dataForm.issuingUnit" placeholder="发放单位"></u-input>
				</u-form-item>
				<u-form-item label="员工部门" prop="position" v-if="judgeShow('position')">
					<u-input v-model="dataForm.position" placeholder="员工部门" ></u-input>
				</u-form-item>
				<u-form-item label="员工职位" prop="month" v-if="judgeShow('month')">
					<u-input v-model="dataForm.month" placeholder="员工职位"></u-input>
				</u-form-item>
				<u-form-item label="出勤天数" prop="actualAttendance" v-if="judgeShow('actualAttendance')" required>
					<u-input v-model="dataForm.actualAttendance" placeholder="出勤天数" type="number"></u-input>
				</u-form-item>
			</view>
			<u-form-item label="基本薪资" prop="baseSalary" v-if="judgeShow('baseSalary')" required>
				<u-input v-model="dataForm.baseSalary" placeholder="基本薪资" type="number"></u-input>
			</u-form-item>
			<u-form-item label="员工津贴" prop="allowance" v-if="judgeShow('allowance')" required>
				<u-input v-model="dataForm.allowance" placeholder="员工津贴" type="number"></u-input>
			</u-form-item>
			<u-form-item label="员工保险" prop="insurance" v-if="judgeShow('insurance')" required>
				<u-input v-model="dataForm.insurance" placeholder="员工保险" type="number"></u-input>
			</u-form-item>
			<u-form-item label="所得税" prop="incomeTax" v-if="judgeShow('incomeTax')" required>
				<u-input v-model="dataForm.incomeTax" placeholder="所得税" type="number"></u-input>
			</u-form-item>
			<u-form-item label="员工绩效" prop="performance" v-if="judgeShow('performance')" required>
				<u-input v-model="dataForm.performance" placeholder="员工绩效" type="number"></u-input>
			</u-form-item>
			<u-form-item label="加班费用" prop="overtimePay" v-if="judgeShow('overtimePay')" required>
				<u-input v-model="dataForm.overtimePay" placeholder="加班费用" type="number"></u-input>
			</u-form-item>
			<u-form-item label="应发工资" prop="grossPay" v-if="judgeShow('grossPay')" required>
				<u-input v-model="dataForm.grossPay" placeholder="应发工资" type="number"></u-input>
			</u-form-item>
			<u-form-item label="实发工资" prop="payroll" v-if="judgeShow('payroll')" required>
				<u-input v-model="dataForm.payroll" placeholder="实发工资" type="number"></u-input>
			</u-form-item>
			<u-form-item label="备注" prop="description" v-if="judgeShow('description')">
				<u-input v-model="dataForm.description" placeholder="备注" type="textarea"></u-input>
			</u-form-item>
		</u-form>
	</view>
</template>

<script>
	import comMixin from '../mixin'
	export default {
		name: 'PayDistributionNo',
		mixins: [comMixin],
		data() {
			return {
				billEnCode: 'WF_PayDistributionNo',
				dataForm: {
					flowTitle: '',
					billNo:'',
					flowUrgent:1,
					month:'',
					issuingUnit:'',
					department:'',
					position:'',
					baseSalary:'',
					actualAttendance:'',
					allowance:'',
					incomeTax:'',
					insurance:'',
					performance:'',
					overtimePay:'',
					grossPay:'',
					payroll:'',
					description:''
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
				this.dataForm.applyDate = new Date().getTime()
				this.dataForm.flowTitle = this.userInfo.userName + "的薪酬发放"
				this.dataForm.applyUser = this.userInfo.userName + '/' + this.userInfo.userAccount
				if (this.userInfo.positionIds && this.userInfo.positionIds.length) {
					let list = this.userInfo.positionIds.map(o => o.name)
					this.dataForm.position = list.join(',')
				}
			}
		}
	}
</script>