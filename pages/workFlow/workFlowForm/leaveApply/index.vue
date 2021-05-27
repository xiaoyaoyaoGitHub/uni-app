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
				<u-form-item label="申请部门" prop="applyPost" v-if="judgeShow('applyPost')">
					<u-input v-model="dataForm.applyPost" placeholder="请输入申请部门"></u-input>
				</u-form-item>
				<u-form-item label="申请职位" prop="position" v-if="judgeShow('position')">
					<u-input v-model="dataForm.position" placeholder="请输入申请职位"></u-input>
				</u-form-item>
				<u-form-item label="申请日期" prop="applyDate" v-if="judgeShow('applyDate')">
					<jnpf-date-time type="date" v-model="dataForm.applyDate" placeholder="请输入申请日期"></jnpf-date-time>
				</u-form-item>
				<u-form-item label="请假类别" prop="leaveType" v-if="judgeShow('leaveType')" required>
					<jnpf-select v-model="dataForm.leaveType" placeholder="请选择下拉框组" :options="leaveTypeList"></jnpf-select>
				</u-form-item>
				<u-form-item label="请假原因" prop="leaveReason" v-if="judgeShow('leaveReason')" required>
					<u-input v-model="dataForm.leaveReason" placeholder="请输入请假原因" type="textarea"></u-input>
				</u-form-item>
				<u-form-item label="起始时间" prop="leaveStartTime" v-if="judgeShow('leaveStartTime')" required>
					<jnpf-date-time type="datetime" v-model="dataForm.leaveStartTime" placeholder="请输入起始时间"></jnpf-date-time>
				</u-form-item>
				<u-form-item label="结束时间" prop="leaveEndTime" v-if="judgeShow('leaveEndTime')" required>
					<jnpf-date-time type="datetime" v-model="dataForm.leaveEndTime" placeholder="请输入结束时间"></jnpf-date-time>
				</u-form-item>
				
				<u-form-item label="请假天数" prop="leaveDayCount" v-if="judgeShow('leaveDayCount')" required>
					<u-input v-model="dataForm.leaveDayCount" placeholder="请输入请假天数"></u-input>
				</u-form-item>
				<u-form-item label="请假小时" prop="leaveHour" v-if="judgeShow('leaveHour')" required>
					<u-input v-model="dataForm.leaveHour" placeholder="请输入请假小时" type="number"></u-input>
				</u-form-item>
				<u-form-item label="相关附件" prop="fileList" v-if="judgeShow('fileList')">
					<jnpf-upload v-model="dataForm.fileList"></jnpf-upload>
				</u-form-item>
				
			</view>
		</u-form>
	</view>
</template>

<script>
	import comMixin from '../mixin'
	export default {
		name: 'LeaveApplyNo',
		mixins: [comMixin],
		data() {
			return {
				billEnCode: 'WF_LeaveApplyNo',
				dataForm: {
					flowTitle: '',
					billNo:'',
					flowUrgent:1,
					applyUser:'',
					leaveHour:'',
					applyPost:'',
					leaveStartTime:'',
					leaveEndTime:'',
					leaveDayCount:'',
					leaveReason:'',
					applyDate:'',
					leaveType:'',
					fileList:[],
					position:''
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
					leaveHour: [{
						required: true,
						message: '请假小时不能为空',
						trigger: 'blur',
					}],
					leaveStartTime:[{
						required: true,
						message: '起始时间不能为空',
						trigger: 'blur',
					}],
					leaveDayCount:[{
						required: true,
						message: '请假天数不能为空',
						trigger: 'blur',
					}],
					leaveEndTime:[{
						required: true,
						message: '结束时间不能为空',
						trigger: 'blur',
					}],
					leaveType:[{
						required: true,
						message: '请假原因不能为空',
						trigger: 'blur',
					}],
				},
				leaveTypeList: [{
						fullName: '事假',
						id: '1',
						checked: false
					},
					{
						fullName: '病假',
						id: '2',
						checked: false
					},
					{
						fullName: '婚假',
						id: '3',
						checked: false
					},
					{
						fullName: '产假',
						id: '4',
						checked: false
					},
					{
						fullName: '丧假',
						id: '5',
						checked: false
					},
					{
						fullName: '年假',
						id: '6',
						checked: false
					},
					{
						fullName: '调休',
						id: '6',
						checked: false
					},
					{
						fullName: '其他',
						id: '6',
						checked: false
					},
					
				],
			}
		},
		methods: {
			selfInit(data) {
				this.dataForm.applyDate = new Date().getTime()
				this.dataForm.flowTitle = this.userInfo.userName + "的请假申请表"
				this.dataForm.applyUser = this.userInfo.userName + '/' + this.userInfo.userAccount
				this.dataForm.applyPost = this.userInfo.departmentName
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
