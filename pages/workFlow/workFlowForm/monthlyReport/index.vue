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
				<u-form-item label="创建人员" prop="applyUser" v-if="judgeShow('applyUser')">
					<u-input v-model="dataForm.applyUser" placeholder="请输入创建人员" :disabled="judgeWrite('applyUser')">
					</u-input>
				</u-form-item>
				<u-form-item label="所属部门" prop="applyDept" v-if="judgeShow('applyDept')">
					<u-input v-model="dataForm.applyDept" placeholder="请输入所属部门" :disabled="judgeWrite('applyDept')">
					</u-input>
				</u-form-item>
				<u-form-item label="所属职务" prop="applyPost" v-if="judgeShow('applyPost')">
					<u-input v-model="dataForm.applyPost" placeholder="请输入所属职务" :disabled="judgeWrite('applyPost')">
					</u-input>
				</u-form-item>
				<u-form-item label="创建日期" prop="applyDate" v-if="judgeShow('applyDate')">
					<cudt-date-time type="date" v-model="dataForm.applyDate" placeholder="请输入创建日期"
						:disabled="judgeWrite('applyDate')"></cudt-date-time>
				</u-form-item>
				<u-form-item label="完成时间" prop="planEndTime" v-if="judgeShow('planEndTime')">
					<cudt-date-time type="datetime" v-model="dataForm.planEndTime" placeholder="请输入完成时间"
						:disabled="judgeWrite('planEndTime')"></cudt-date-time>
				</u-form-item>
				<u-form-item label="总体评价" prop="overalEvaluat" v-if="judgeShow('overalEvaluat')">
					<u-input v-model="dataForm.overalEvaluat" placeholder="请输入总体评价"
						:disabled="judgeWrite('overalEvaluat')"></u-input>
				</u-form-item>
				<u-form-item label="工作事项" prop="npworkMatter" v-if="judgeShow('npworkMatter')">
					<u-input v-model="dataForm.npworkMatter" placeholder="请输入工作事项"
						:disabled="judgeWrite('npworkMatter')"></u-input>
				</u-form-item>
				<u-form-item label="次月时间" prop="npfinishTime" v-if="judgeShow('npfinishTime')">
					<cudt-date-time type="datetime" v-model="dataForm.npfinishTime" placeholder="请输入次月时间"
						:disabled="judgeWrite('npfinishTime')"></cudt-date-time>
				</u-form-item>
				<u-form-item label="次月目标" prop="nfinishMethod" v-if="judgeShow('nfinishMethod')">
					<u-input v-model="dataForm.nfinishMethod" placeholder="请输入份数" type="number"
						:disabled="judgeWrite('nfinishMethod')"></u-input>
				</u-form-item>
				<u-form-item label="相关附件" prop="fileJson" v-if="judgeShow('fileJson')">
					<cudt-file :list="fileList" :disabled="judgeWrite('fileJson')" />
				</u-form-item>
			</view>
		</u-form>
	</view>
</template>

<script>
	import comMixin from '../mixin'
	export default {
		name: 'MonthlyReport',
		mixins: [comMixin],
		data() {
			return {
				billEnCode: 'WF_MonthlyReportNo',
				dataForm: {
					flowTitle: '',
					billNo: '',
					flowUrgent: 1,
					nfinishMethod: '',
					npfinishTime: '',
					npworkMatter: '',
					applyUser: '',
					applyDept: '',
					applyPost: '',
					applyDate: '',
					fileJson: '',
					overalEvaluat: '',
					planEndTime: ''
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
					this.dataForm.applyPost = list.join(',')
				}
			},

		}
	}
</script>

<style>

</style>
