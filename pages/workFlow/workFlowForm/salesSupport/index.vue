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
				<u-form-item label="申请人员" prop="applyUser" v-if="judgeShow('applyUser')">
					<u-input v-model="dataForm.applyUser" placeholder="请输入申请人员"></u-input>
				</u-form-item>
				<u-form-item label="申请部门" prop="applyDept" v-if="judgeShow('applyDept')">
					<u-input v-model="dataForm.applyDept" placeholder="请输入申请部门"></u-input>
				</u-form-item>
				<u-form-item label="申请日期" prop="applyDate" v-if="judgeShow('applyDate')">
					<jnpf-date-time type="date" v-model="dataForm.applyDate" placeholder="请输入申请日期"></jnpf-date-time>
				</u-form-item>
				<u-form-item label="相关客户" prop="customer" v-if="judgeShow('customer')" required>
					<u-input v-model="dataForm.customer" placeholder="请输入相关客户"></u-input>
				</u-form-item>
				<u-form-item label="相关项目" prop="project" v-if="judgeShow('project')" required>
					<u-input v-model="dataForm.project" placeholder="请输入相关项目"></u-input>
				</u-form-item>
				<u-form-item label="售前支持" prop="psaleSupInfo" v-if="judgeShow('psaleSupInfo')">
					<u-input v-model="dataForm.psaleSupInfo" placeholder="请输入售前支持"></u-input>
				</u-form-item>
				<u-form-item label="开始时间" prop="startDate" v-if="judgeShow('startDate')" required>
					<jnpf-date-time type="datetime" v-model="dataForm.startDate" placeholder="请输入开始时间"></jnpf-date-time>
				</u-form-item>
				<u-form-item label="结束时间" prop="endDate" v-if="judgeShow('endDate')" required>
					<jnpf-date-time type="datetime" v-model="dataForm.endDate" placeholder="请输入结束时间"></jnpf-date-time>
				</u-form-item>
				<u-form-item label="支持天数" prop="psaleSupDays" v-if="judgeShow('psaleSupDays')">
					<u-input v-model="dataForm.psaleSupDays" placeholder="请输入支持天数"></u-input>
				</u-form-item>
				<u-form-item label="准备天数" prop="psalePreDays" v-if="judgeShow('psalePreDays')">
					<u-input v-model="dataForm.psalePreDays" placeholder="请输入准备天数"></u-input>
				</u-form-item>
				<u-form-item label="机构咨询" prop="consulManager" v-if="judgeShow('consulManager')">
					<u-input v-model="dataForm.consulManager" placeholder="请输入机构咨询"></u-input>
				</u-form-item>
				<u-form-item label="售前顾问" prop="psalSupConsul" v-if="judgeShow('psalSupConsul')">
					<u-input v-model="dataForm.psalSupConsul" placeholder="请输入售前顾问"></u-input>
				</u-form-item>
				<u-form-item label="销售总结" prop="salSupConclu" v-if="judgeShow('salSupConclu')">
					<u-input v-model="dataForm.salSupConclu" placeholder="请输入销售总结"></u-input>
				</u-form-item>
				<u-form-item label="交付说明" prop="consultResult" v-if="judgeShow('consultResult')">
					<u-input v-model="dataForm.consultResult" placeholder="请输入交付说明" type="textarea"></u-input>
				</u-form-item>
				<u-form-item label="咨询评价" prop="ievaluation" v-if="judgeShow('ievaluation')">
					<u-input v-model="dataForm.ievaluation" placeholder="请输入咨询评价" type="textarea"></u-input>
				</u-form-item>
				<u-form-item label="发起人总结" prop="conclusion" v-if="judgeShow('conclusion')">
					<u-input v-model="dataForm.conclusion" placeholder="请输入发起人总结" type="textarea"></u-input>
				</u-form-item>
				<u-form-item label="相关附件" prop="fileJson" v-if="judgeShow('fileJson')">
					<jnpf-file :list="fileList"/>
				</u-form-item>
			</view>
		</u-form>
	</view>
</template>

<script>
	import comMixin from '../mixin'
	export default {
		name: 'SalesSupport',
		mixins: [comMixin],
		data() {
			return {
				billEnCode: 'WF_SalesSupportNo',
				dataForm: {
					flowTitle: '',
					billNo:'',
					flowUrgent:1,
					psaleSupDays:'',
					endDate:'',
					applyUser:'',
					applyDept:'',
					position:'',
					applyDate:'',
					startDate:'',
					customer:'',
					consultResult:'',
					fileJson:'',
					conclusion:'',
					ievaluation:'',
					salSupConclu:'',
					psalSupConsul:'',
					consulManager:'',
					psalePreDays:'',
					psaleSupInfo:'',
					project:''
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
					startDate:[{
						required: true,
						message: '开始时间不能为空',
						trigger: 'blur',
						type:'number'
					}],
					endDate:[{
						required: true,
						message: '结束时间不能为空',
						trigger: 'blur',
						type:'number'
					}],
					customer:[{
						required: true,
						message: '相关客户不能为空',
						trigger: 'blur',
					}],
					project:[{
						required: true,
						message: '相关项目不能为空',
						trigger: 'blur',
					}],
				},
			}
		},
		methods: {
			selfInit(data) {
				this.dataForm.applyDate = new Date().getTime()
				this.dataForm.flowTitle = this.userInfo.userName + "的销售支持表"
				this.dataForm.applyUser = this.userInfo.userName + '/' + this.userInfo.userAccount
				this.dataForm.applyDept = this.userInfo.departmentName
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
