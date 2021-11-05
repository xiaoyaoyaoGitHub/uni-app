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
				<u-form-item label="主办单位" prop="hostUnit" v-if="judgeShow('hostUnit')">
					<u-input v-model="dataForm.hostUnit" placeholder="请输入主办单位" :disabled="judgeWrite('hostUnit')">
					</u-input>
				</u-form-item>
				<u-form-item label="发文标题" prop="title" v-if="judgeShow('title')">
					<u-input v-model="dataForm.title" placeholder="请输入发文标题" :disabled="judgeWrite('title')"></u-input>
				</u-form-item>
				<u-form-item label="发文字号" prop="issuedNum" v-if="judgeShow('issuedNum')">
					<u-input v-model="dataForm.issuedNum" placeholder="请输入发文字号" :disabled="judgeWrite('issuedNum')">
					</u-input>
				</u-form-item>
				<u-form-item label="发文日期" prop="writingDate" v-if="judgeShow('writingDate')" required>
					<cudt-date-time type="datetime" v-model="dataForm.writingDate" placeholder="请输入发文日期"
						:disabled="judgeWrite('writingDate')"></cudt-date-time>
				</u-form-item>
				<u-form-item label="份数" prop="shareNum" v-if="judgeShow('shareNum')">
					<u-input v-model="dataForm.shareNum" placeholder="请输入份数" type="number"
						:disabled="judgeWrite('shareNum')"></u-input>
				</u-form-item>
				<u-form-item label="主送" prop="mainDelivery" v-if="judgeShow('mainDelivery')">
					<u-input v-model="dataForm.mainDelivery" placeholder="请输入主送" :disabled="judgeWrite('mainDelivery')">
					</u-input>
				</u-form-item>
				<u-form-item label="抄送" prop="copy" v-if="judgeShow('copy')">
					<u-input v-model="dataForm.copy" placeholder="请输入抄送" type="number" :disabled="judgeWrite('copy')">
					</u-input>
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
		name: 'LetterService',
		mixins: [comMixin],
		data() {
			return {
				billEnCode: 'WF_LetterServiceNo',
				dataForm: {
					flowTitle: '',
					billNo: '',
					flowUrgent: 1,
					hostUnit: '',
					copy: '',
					title: '',
					mainDelivery: '',
					shareNum: '',
					writingDate: '',
					fileJson: '',
					issuedNum: ''
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
					writingDate: [{
						required: true,
						message: '发文日期不能为空',
						trigger: 'blur',
						type: 'number'
					}],
				},

			}
		},
		methods: {
			selfInit(data) {
				this.dataForm.applyDate = new Date().getTime()
				this.dataForm.flowTitle = this.userInfo.userName + "的发文单"
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
