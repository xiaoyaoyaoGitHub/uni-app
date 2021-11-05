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
				<u-form-item label="文件标题" prop="fileTitle" v-if="judgeShow('fileTitle')">
					<u-input v-model="dataForm.fileTitle" placeholder="请输入文件标题" :disabled="judgeWrite('fileTitle')">
					</u-input>
				</u-form-item>
				<u-form-item label="来文单位" prop="communicationUnit" v-if="judgeShow('communicationUnit')">
					<u-input v-model="dataForm.communicationUnit" placeholder="请输入来文单位"
						:disabled="judgeWrite('communicationUnit')"></u-input>
				</u-form-item>
				<u-form-item label="来文字号" prop="letterNum" v-if="judgeShow('letterNum')">
					<u-input v-model="dataForm.letterNum" placeholder="请输入来文字号" :disabled="judgeWrite('letterNum')">
					</u-input>
				</u-form-item>
				<u-form-item label="收文日期" prop="receiptDate" v-if="judgeShow('receiptDate')" required>
					<cudt-date-time type="datetime" v-model="dataForm.receiptDate" placeholder="请输入收文日期"
						:disabled="judgeWrite('receiptDate')"></cudt-date-time>
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
		name: 'ReceiptProcessing',
		mixins: [comMixin],
		data() {
			return {
				billEnCode: 'WF_ReceiptProcessingNo',
				dataForm: {
					flowTitle: '',
					billNo: '',
					flowUrgent: 1,
					communicationUnit: '',
					letterNum: '',
					fileTitle: '',
					receiptDate: '',
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
						trigger: 'change',
					}],
					receiptDate: [{
						required: true,
						message: '收文日期不能为空',
						trigger: 'change',
						type: 'number'
					}],
				},
			}
		},
		methods: {
			selfInit(data) {
				this.dataForm.applyDate = new Date().getTime()
				this.dataForm.flowTitle = this.userInfo.userName + "的收文处理表"
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
