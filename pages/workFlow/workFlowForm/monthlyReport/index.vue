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
				<u-form-item label="创建人员" prop="applyUser" v-if="judgeShow('applyUser')">
					<u-input v-model="dataForm.applyUser" placeholder="请输入创建人员"></u-input>
				</u-form-item>
				<u-form-item label="所属部门" prop="applyDept" v-if="judgeShow('applyDept')">
					<u-input v-model="dataForm.applyDept" placeholder="请输入所属部门"></u-input>
				</u-form-item>
				<u-form-item label="所属职务" prop="position" v-if="judgeShow('position')">
					<u-input v-model="dataForm.position" placeholder="请输入所属职务"></u-input>
				</u-form-item>
				<u-form-item label="创建日期" prop="applyDate" v-if="judgeShow('applyDate')">
					<jnpf-date-time type="date" v-model="dataForm.applyDate" placeholder="请输入创建日期"></jnpf-date-time>
				</u-form-item>
				<u-form-item label="完成时间" prop="planEndTime" v-if="judgeShow('planEndTime')">
					<jnpf-date-time type="datetime" v-model="dataForm.planEndTime" placeholder="请输入完成时间"></jnpf-date-time>
				</u-form-item>
				<u-form-item label="总体评价" prop="overalEvaluat" v-if="judgeShow('overalEvaluat')">
					<u-input v-model="dataForm.overalEvaluat" placeholder="请输入总体评价"></u-input>
				</u-form-item>
				<u-form-item label="工作事项" prop="npworkMatter" v-if="judgeShow('npworkMatter')">
					<u-input v-model="dataForm.npworkMatter" placeholder="请输入工作事项"></u-input>
				</u-form-item>
				<u-form-item label="次月时间" prop="npfinishTime" v-if="judgeShow('npfinishTime')">
					<jnpf-date-time type="date" v-model="dataForm.npfinishTime" placeholder="请输入次月时间"></jnpf-date-time>
				</u-form-item>
				<u-form-item label="次月目标" prop="nfinishMethod" v-if="judgeShow('nfinishMethod')">
					<u-input v-model="dataForm.nfinishMethod" placeholder="请输入份数" type="number"></u-input>
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
		name: 'MonthlyReportNo',
		mixins: [comMixin],
		data() {
			return {
				billEnCode: 'WF_MonthlyReportNo',
				dataForm: {
					flowTitle: '',
					billNo:'',
					flowUrgent:1,
					nfinishMethod:'',
					npfinishTime:'',
					npworkMatter:'',
					applyUser:'',
					applyDept:'',
					position:'',
					applyDate:'',
					fileList:[],
					overalEvaluat:'',
					planEndTime:''
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
					}]
				},
				
			}
		},
		methods: {
			selfInit(data) {
				this.dataForm.applyDate = new Date().getTime()
				this.dataForm.flowTitle = this.userInfo.userName + "的月工作总结"
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
