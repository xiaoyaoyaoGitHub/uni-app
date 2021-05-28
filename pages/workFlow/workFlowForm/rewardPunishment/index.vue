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
				<u-form-item label="填表日期" prop="applyDate" v-if="judgeShow('applyDate')">
					<jnpf-date-time type="date" v-model="dataForm.applyDate" placeholder="请输入填表日期"></jnpf-date-time>
				</u-form-item>
				<u-form-item label="员工姓名" prop="applyUser" v-if="judgeShow('applyUser')">
					<u-input v-model="dataForm.applyUser" placeholder="请输入员工姓名"></u-input>
				</u-form-item>
				<u-form-item label="员工部门" prop="applyPost" v-if="judgeShow('applyPost')">
					<u-input v-model="dataForm.applyPost" placeholder="请输入员工部门" disabled></u-input>
				</u-form-item>
				<u-form-item label="员工职务" prop="position" v-if="judgeShow('position')">
					<u-input v-model="dataForm.position" placeholder="请输入员工职务"></u-input>
				</u-form-item>
				
				<u-form-item label="赏罚金额" prop="rewardPun" v-if="judgeShow('rewardPun')" required>
					<u-input v-model="dataForm.rewardPun" placeholder="请输入赏罚金额" type="number"></u-input>
				</u-form-item>
				<u-form-item label="赏罚原因" prop="reason" v-if="judgeShow('reason')" required>
					<u-input v-model="dataForm.reason" placeholder="请输入赏罚原因" type="textarea"></u-input>
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
					position:'',
					applyPost:'',
					applyUser:'',
					applyDate:'',
					reason:'',
					rewardPun:''
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
						type:'number'
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
				this.dataForm.applyDate = new Date().getTime()
				this.dataForm.flowTitle = this.userInfo.userName + "的行政赏罚单"
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
