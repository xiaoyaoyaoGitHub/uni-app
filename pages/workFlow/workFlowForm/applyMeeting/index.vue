<template>
	<view class="cudt-wrap cudt-wrap-workflow">
		<u-form :model="dataForm" :rules="rules" ref="dataForm" :errorType="['toast']" label-position="left"
			label-width="150" label-align="left">
			<u-form-item label="流程标题" prop="flowTitle" required v-if="judgeShow('flowTitle')">
				<u-input v-model="dataForm.flowTitle" placeholder="流程标题" :disabled="judgeWrite('flowTitle')"></u-input>
			</u-form-item>
			<u-form-item label="流程编码" prop="billNo" v-if="judgeShow('billNo')" required>
				<u-input v-model="dataForm.billNo" placeholder="流程编码" disabled></u-input>
			</u-form-item>
			<u-form-item label="紧急程度" prop="flowUrgent" required v-if="judgeShow('flowUrgent')">
				<cudt-select v-model="dataForm.flowUrgent" placeholder="请选择紧急程度" :options="flowUrgentOptions"
					:disabled="judgeWrite('flowUrgent')">
				</cudt-select>
			</u-form-item>

			<view class="cudt-card">
				<u-form-item label="申请人员" prop="applyUser" v-if="judgeShow('applyUser')">
					<u-input v-model="dataForm.applyUser" placeholder="申请人员" :disabled="judgeWrite('applyUser')">
					</u-input>
				</u-form-item>
				<u-form-item label="所属职务" prop="position" v-if="judgeShow('position')">
					<u-input v-model="dataForm.position" placeholder="所属职务" :disabled="judgeWrite('position')">
					</u-input>
				</u-form-item>
				<u-form-item label="会议名称" prop="conferenceName" v-if="judgeShow('conferenceName')" required>
					<u-input v-model="dataForm.conferenceName" placeholder="会议名称"
						:disabled="judgeWrite('conferenceName')"></u-input>
				</u-form-item>
				<u-form-item label="会议主题" prop="conferenceTheme" v-if="judgeShow('conferenceTheme')">
					<u-input v-model="dataForm.conferenceTheme" placeholder="会议主题"
						:disabled="judgeWrite('conferenceTheme')"></u-input>
				</u-form-item>
				<u-form-item label="会议类型" prop="conferenceType" v-if="judgeShow('conferenceType')">
					<u-input v-model="dataForm.conferenceType" placeholder="会议类型" type="number"
						:disabled="judgeWrite('conferenceType')"></u-input>
				</u-form-item>
				<u-form-item label="预计人数" prop="estimatePeople" v-if="judgeShow('estimatePeople')">
					<u-input v-model="dataForm.estimatePeople" placeholder="预计人数"
						:disabled="judgeWrite('estimatePeople')"></u-input>
				</u-form-item>
				<u-form-item label="会议室" prop="conferenceRoom" v-if="judgeShow('conferenceRoom')">
					<u-input v-model="dataForm.conferenceRoom" placeholder="会议室"
						:disabled="judgeWrite('conferenceRoom')"></u-input>
				</u-form-item>
				<u-form-item label="管理人" prop="administrator" v-if="judgeShow('administrator')">
					<u-input v-model="dataForm.administrator" placeholder="管理人" :disabled="judgeWrite('administrator')">
					</u-input>
				</u-form-item>
				<u-form-item label="查看人" prop="lookPeople" v-if="judgeShow('lookPeople')">
					<u-input v-model="dataForm.lookPeople" placeholder="查看人" :disabled="judgeWrite('lookPeople')">
					</u-input>
				</u-form-item>
				<u-form-item label="纪要员" prop="memo" v-if="judgeShow('memo')">
					<u-input v-model="dataForm.memo" placeholder="纪要员" :disabled="judgeWrite('memo')"></u-input>
				</u-form-item>
				<u-form-item label="出席人" prop="attendees" v-if="judgeShow('attendees')">
					<u-input v-model="dataForm.attendees" placeholder="出席人" :disabled="judgeWrite('attendees')">
					</u-input>
				</u-form-item>
				<u-form-item label="申请材料" prop="applyMaterial" v-if="judgeShow('applyMaterial')">
					<u-input v-model="dataForm.applyMaterial" placeholder="申请材料"
						:disabled="judgeWrite('applyMaterial')"></u-input>
				</u-form-item>
			</view>

			<view class="cudt-card">
				<u-form-item label="预计金额" prop="estimatedAmount" v-if="judgeShow('estimatedAmount')">
					<u-input v-model="dataForm.estimatedAmount" placeholder="预计金额"
						:disabled="judgeWrite('estimatedAmount')"></u-input>
				</u-form-item>
				<u-form-item label="其他出席人" prop="otherAttendee" v-if="judgeShow('otherAttendee')">
					<u-input v-model="dataForm.otherAttendee" placeholder="其他出席人"
						:disabled="judgeWrite('otherAttendee')"></u-input>
				</u-form-item>
				<u-form-item label="开始时间" prop="startDate" v-if="judgeShow('startDate')" required>
					<cudt-date-time type="datetime" v-model="dataForm.startDate" placeholder="开始时间"
						:disabled="judgeWrite('startDate')"></cudt-date-time>
				</u-form-item>
				<u-form-item label="结束时间" prop="endDate" v-if="judgeShow('endDate')" required>
					<cudt-date-time type="datetime" v-model="dataForm.endDate" placeholder="结束时间"
						:disabled="judgeWrite('endDate')"></cudt-date-time>
				</u-form-item>
				<u-form-item label="相关附件" prop="fileJson" v-if="judgeShow('fileJson')">
					<cudt-file :list="fileList" />
				</u-form-item>
				<u-form-item label="会议描述" prop="describe" v-if="judgeShow('describe')">
					<u-input v-model="dataForm.describe" placeholder="会议描述" type="textarea"
						:disabled="judgeWrite('describe')"></u-input>
				</u-form-item>
			</view>
		</u-form>
	</view>
</template>

<script>
	import comMixin from '../mixin'
	export default {
		name: 'ApplyMeeting',
		mixins: [comMixin],
		data() {
			return {
				billEnCode: 'WF_ApplyMeetingNo',
				dataForm: {
					flowTitle: '',
					billNo: '',
					flowUrgent: 1,
					applyDate: '',
					applyUser: '',
					position: '',
					startDate: '',
					endDate: '',
					estimatedAmount: 0,
					estimatePeople: '',
					conferenceName: '',
					fileJson: '',
					describe: '',
					otherAttendee: '',
					applyMaterial: '',
					attendees: '',
					memo: '',
					lookPeople: '',
					administrator: '',
					conferenceRoom: '',
					conferenceType: '',
					conferenceTheme: ''
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
					conferenceName: [{
						required: true,
						message: '会议名称不能为空',
						trigger: 'change',
					}]
				},
			}
		},
		methods: {
			selfInit(data) {
				this.dataForm.flowTitle = this.userInfo.userName + "的会议申请"
				this.dataForm.applyUser = this.userInfo.userName + '/' + this.userInfo.userAccount
				if (this.userInfo.positionIds && this.userInfo.positionIds.length) {
					let list = this.userInfo.positionIds.map(o => o.name)
					this.dataForm.position = list.join(',')
				}
			}
		}
	}
</script>
