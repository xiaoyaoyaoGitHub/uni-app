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
				<u-form-item label="填表日期" prop="fillFromDate" v-if="judgeShow('fillFromDate')">
					<cudt-date-time type="date" v-model="dataForm.fillFromDate" placeholder="请输入填表日期"
						:disabled="judgeWrite('fillFromDate')"></cudt-date-time>
				</u-form-item>
				<u-form-item label="员工姓名" prop="fullName" v-if="judgeShow('fullName')">
					<u-input v-model="dataForm.fullName" placeholder="请输入员工姓名" :disabled="judgeWrite('fullName')">
					</u-input>
				</u-form-item>
				<u-form-item label="员工部门" prop="department" v-if="judgeShow('department')">
					<u-input v-model="dataForm.department" placeholder="请输入员工部门" :disabled="judgeWrite('department')">
					</u-input>
				</u-form-item>
				<u-form-item label="员工职务" prop="position" v-if="judgeShow('position')">
					<u-input v-model="dataForm.position" placeholder="请输入员工职务" :disabled="judgeWrite('position')">
					</u-input>
				</u-form-item>

				<u-form-item label="赏罚金额" prop="rewardPun" v-if="judgeShow('rewardPun')" required>
					<u-input v-model="dataForm.rewardPun" placeholder="请输入赏罚金额" type="number"
						:disabled="judgeWrite('rewardPun')"></u-input>
				</u-form-item>
				<u-form-item label="赏罚原因" prop="reason" v-if="judgeShow('reason')" required>
					<u-input v-model="dataForm.reason" placeholder="请输入赏罚原因" type="textarea"
						:disabled="judgeWrite('reason')"></u-input>
				</u-form-item>
			</view>
		</u-form>
	</view>
</template>

<script>
	import comMixin from '../mixin'
	export default {
		name: 'RewardPunishment',
		mixins: [comMixin],
		data() {
			return {
				billEnCode: 'WF_RewardPunishmentNo',
				dataForm: {
					flowTitle: '',
					billNo: '',
					flowUrgent: 1,
					position: '',
					department: '',
					fullName: '',
					fillFromDate: '',
					reason: '',
					rewardPun: ''
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
					rewardPun: [{
						required: true,
						message: '赏罚金额不能为空',
						trigger: 'change',
						type: 'number'
					}],
					reason: [{
						required: true,
						message: '赏罚原因不能为空',
						trigger: 'change',
					}],
				},
			}
		},
		methods: {
			selfInit(data) {
				this.dataForm.fillFromDate = new Date().getTime()
				this.dataForm.flowTitle = this.userInfo.userName + "的行政赏罚单"
				this.dataForm.fullName = this.userInfo.userName + '/' + this.userInfo.userAccount
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
