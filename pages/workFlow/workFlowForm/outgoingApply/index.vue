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
				<u-form-item label="所属部门" prop="applyPost" v-if="judgeShow('applyPost')">
					<u-input v-model="dataForm.applyPost" placeholder="请输入所属部门"></u-input>
				</u-form-item>
				<u-form-item label="申请日期" prop="applyDate" v-if="judgeShow('applyDate')">
					<jnpf-date-time type="date" v-model="dataForm.applyDate" placeholder="请输入申请日期"></jnpf-date-time>
				</u-form-item>
				<u-form-item label="外出总计" prop="outgoingTotle" v-if="judgeShow('outgoingTotle')">
					<u-input v-model="dataForm.outgoingTotle" placeholder="请输入外出总计"></u-input>
				</u-form-item>
				<u-form-item label="开始时间" prop="startTime" v-if="judgeShow('startTime')" required>
					<jnpf-date-time type="datetime" v-model="dataForm.startTime" placeholder="请输入开始时间"></jnpf-date-time>
				</u-form-item>
				<u-form-item label="结束时间" prop="endTime" v-if="judgeShow('endTime')" required>
					<jnpf-date-time type="datetime" v-model="dataForm.endTime" placeholder="请输入结束时间"></jnpf-date-time>
				</u-form-item>
				<u-form-item label="目的地" prop="destination" v-if="judgeShow('destination')">
					<u-input v-model="dataForm.destination" placeholder="请输入目的地"></u-input>
				</u-form-item>
				<u-form-item label="相关附件" prop="fileList" v-if="judgeShow('fileList')">
					<jnpf-upload v-model="dataForm.fileList"></jnpf-upload>
				</u-form-item>
				<u-form-item label="外出事由" prop="outgoingCause" v-if="judgeShow('outgoingCause')">
					<u-input v-model="dataForm.outgoingCause" placeholder="请输入外出事由" type="textarea"></u-input>
				</u-form-item>
			</view>
		</u-form>
	</view>
</template>

<script>
	import comMixin from '../mixin'
	export default {
		name: 'OutgoingApplyNo',
		mixins: [comMixin],
		data() {
			return {
				billEnCode: 'WF_OutgoingApplyNo',
				dataForm: {
					flowTitle: '',
					billNo:'',
					flowUrgent:1,
					destination:'',
					endTime:'',
					applyUser:'',
					applyPost:'',
					position:'',
					applyDate:'',
					startTime:'',
					outgoingTotle:'',
					outgoingCause:'',
					fileList:[]
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
					startTime:[{
						required: true,
						message: '开始时间不能为空',
						trigger: 'blur',
					}],
					endTime:[{
						required: true,
						message: '结束时间不能为空',
						trigger: 'blur',
					}]
				},
			}
		},
		methods: {
			selfInit(data) {
				this.dataForm.applyDate = new Date().getTime()
				this.dataForm.flowTitle = this.userInfo.userName + "的领用办公用品申请"
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
