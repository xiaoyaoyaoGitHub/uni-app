<template>
	<view class="jnpf-wrap jnpf-wrap-workflow">
		<u-form :model="dataForm" :rules="rules" ref="dataForm" :errorType="['toast']" label-position="left"
			label-width="150" label-align="left">
			<u-form-item label="流程标题" prop="flowTitle" v-if="judgeShow('flowTitle')" required>
				<u-input v-model="dataForm.flowTitle" placeholder="流程标题" :disabled="judgeWrite('flowTitle')"></u-input>
			</u-form-item>
			<u-form-item label="流程编码" prop="billNo" v-if="judgeShow('billNo')" required>
				<u-input v-model="dataForm.billNo" placeholder="流程编码" disabled></u-input>
			</u-form-item>
			<u-form-item label="紧急程度" prop="flowUrgent" v-if="judgeShow('flowUrgent')" required>
				<jnpf-select v-model="dataForm.flowUrgent" placeholder="请选择紧急程度" :options="flowUrgentOptions" :disabled="judgeWrite('flowUrgent')">
				</jnpf-select>
			</u-form-item>
			
			<view class="jnpf-card">
				<u-form-item label="文件标题" prop="fileTitle" v-if="judgeShow('fileTitle')">
					<u-input v-model="dataForm.fileTitle" placeholder="请输入文件标题" :disabled="judgeWrite('fileTitle')"></u-input>
				</u-form-item>
				<u-form-item label="主办单位" prop="draftedPerson" v-if="judgeShow('draftedPerson')">
					<u-input v-model="dataForm.draftedPerson" placeholder="请输入主办单位" :disabled="judgeWrite('draftedPerson')"></u-input>
				</u-form-item>
				<u-form-item label="发往单位" prop="sendUnit" v-if="judgeShow('sendUnit')">
					<u-input v-model="dataForm.sendUnit" placeholder="请输入发往单位" :disabled="judgeWrite('sendUnit')"></u-input>
				</u-form-item>
				<u-form-item label="发文编号" prop="writingNum" v-if="judgeShow('writingNum')">
					<u-input v-model="dataForm.writingNum" placeholder="请输入发文编号" :disabled="judgeWrite('writingNum')"></u-input>
				</u-form-item>
				<u-form-item label="发文日期" prop="writingDate" v-if="judgeShow('writingDate')" required>
					<jnpf-date-time type="datetime" v-model="dataForm.writingDate" placeholder="请输入发文日期" :disabled="judgeWrite('writingDate')"></jnpf-date-time>
				</u-form-item>
				<u-form-item label="份数" prop="shareNum" v-if="judgeShow('shareNum')">
					<u-input v-model="dataForm.shareNum" placeholder="请输入份数" type="number" :disabled="judgeWrite('shareNum')"></u-input>
				</u-form-item>
				<u-form-item label="相关附件" prop="fileJson" v-if="judgeShow('fileJson')">
					<jnpf-file :list="fileList" :disabled="judgeWrite('fileJson')"/>
				</u-form-item>
				<u-form-item label="备注" prop="description" v-if="judgeShow('description')">
					<u-input v-model="dataForm.description" placeholder="请输入备注" :disabled="judgeWrite('description')"></u-input>
				</u-form-item>
			</view>
		</u-form>
	</view>
</template>

<script>
	import comMixin from '../mixin'
	export default {
		name: 'PostBatchTab',
		mixins: [comMixin],
		data() {
			return {
				billEnCode: 'WF_PostBatchTabNo',
				dataForm: {
					flowTitle: '',
					billNo:'',
					flowUrgent:1,
					fileTitle:'',
					description:'',
					shareNum:'',
					writingDate:'',
					fileJson:'',
					sendUnit:''
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
					writingDate:[{
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
				this.dataForm.flowTitle = this.userInfo.userName + "的发文呈批表"
			},
		}
	}
</script>

<style>

</style>
