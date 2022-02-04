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
				<u-form-item label="申请人员" prop="applyUser" v-if="judgeShow('applyUser')">
					<u-input v-model="dataForm.applyUser" placeholder="请输入申请人员" :disabled="judgeWrite('applyUser')">
					</u-input>
				</u-form-item>
				<u-form-item label="所属部门" prop="department" v-if="judgeShow('department')">
					<u-input v-model="dataForm.department" placeholder="请输入所属部门" :disabled="judgeWrite('department')">
					</u-input>
				</u-form-item>
				<u-form-item label="申请日期" prop="applyDate" v-if="judgeShow('applyDate')">
					<cudt-date-time type="date" v-model="dataForm.applyDate" placeholder="请输入申请日期"
						:disabled="judgeWrite('applyDate')"></cudt-date-time>
				</u-form-item>
				<u-form-item label="外出总计" prop="outgoingTotle" v-if="judgeShow('outgoingTotle')">
					<u-input v-model="dataForm.outgoingTotle" placeholder="请输入外出总计"
						:disabled="judgeWrite('outgoingTotle')"></u-input>
				</u-form-item>
				<u-form-item label="开始时间" prop="startTime" v-if="judgeShow('startTime')" required>
					<cudt-date-time type="datetime" v-model="dataForm.startTime" placeholder="请输入开始时间"
						:disabled="judgeWrite('startTime')"></cudt-date-time>
				</u-form-item>
				<u-form-item label="结束时间" prop="endTime" v-if="judgeShow('endTime')" required>
					<cudt-date-time type="datetime" v-model="dataForm.endTime" placeholder="请输入结束时间"
						:disabled="judgeWrite('endTime')"></cudt-date-time>
				</u-form-item>
				<u-form-item label="目的地" prop="destination" v-if="judgeShow('destination')">
					<u-input v-model="dataForm.destination" placeholder="请输入目的地" :disabled="judgeWrite('destination')">
					</u-input>
				</u-form-item>
				<u-form-item label="相关附件" prop="fileJson" v-if="judgeShow('fileJson')">
					<cudt-file :list="fileList" :disabled="judgeWrite('fileJson')" />
				</u-form-item>
				<u-form-item label="外出事由" prop="outgoingCause" v-if="judgeShow('outgoingCause')">
					<u-input v-model="dataForm.outgoingCause" placeholder="请输入外出事由" type="textarea"
						:disabled="judgeWrite('outgoingCause')"></u-input>
				</u-form-item>
			</view>
		</u-form>
	</view>
</template>

<script>
	import comMixin from '../mixin'
	export default {
		name: 'OutgoingApply',
		mixins: [comMixin],
		data() {
			return {
				billEnCode: 'WF_OutgoingApplyNo',
				dataForm: {
					flowTitle: '',
					billNo: '',
					flowUrgent: 1,
					destination: '',
					endTime: '',
					applyUser: '',
					department: '',
					position: '',
					applyDate: '',
					startTime: '',
					outgoingTotle: '',
					outgoingCause: '',
					fileJson: ''
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
					startTime: [{
						required: true,
						message: '开始时间不能为空',
						trigger: 'blur',
						type: 'number'
					}],
					endTime: [{
						required: true,
						message: '结束时间不能为空',
						trigger: 'blur',
						type: 'number'
					}]
				},
			}
		},
		methods: {
			selfInit(data) {
				this.dataForm.applyDate = new Date().getTime()
				this.dataForm.flowTitle = this.userInfo.userName + "的外出申请"
				this.dataForm.applyUser = this.userInfo.userName + '/' + this.userInfo.userAccount
				this.dataForm.department = this.userInfo.departmentName
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
