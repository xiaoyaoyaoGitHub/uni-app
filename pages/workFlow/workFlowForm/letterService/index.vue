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
				<u-form-item label="主办单位" prop="hostUnit" v-if="judgeShow('hostUnit')">
					<u-input v-model="dataForm.hostUnit" placeholder="请输入主办单位"></u-input>
				</u-form-item>
				<u-form-item label="发文标题" prop="title" v-if="judgeShow('title')">
					<u-input v-model="dataForm.title" placeholder="请输入发文标题"></u-input>
				</u-form-item>
				<u-form-item label="发文字号" prop="issuedNum" v-if="judgeShow('issuedNum')">
					<u-input v-model="dataForm.issuedNum" placeholder="请输入发文字号"></u-input>
				</u-form-item>
				<u-form-item label="发文日期" prop="writingDate" v-if="judgeShow('writingDate')" required>
					<jnpf-date-time type="date" v-model="dataForm.writingDate" placeholder="请输入发文日期"></jnpf-date-time>
				</u-form-item>
				<u-form-item label="份数" prop="shareNum" v-if="judgeShow('shareNum')">
					<u-input v-model="dataForm.shareNum" placeholder="请输入份数" type="number"></u-input>
				</u-form-item>
				<u-form-item label="主送" prop="mainDelivery" v-if="judgeShow('mainDelivery')">
					<u-input v-model="dataForm.mainDelivery" placeholder="请输入主送"></u-input>
				</u-form-item>
				<u-form-item label="抄送" prop="copy" v-if="judgeShow('copy')">
					<u-input v-model="dataForm.copy" placeholder="请输入抄送" type="number"></u-input>
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
		name: 'LetterServiceNo',
		mixins: [comMixin],
		data() {
			return {
				billEnCode: 'WF_LetterServiceNo',
				dataForm: {
					flowTitle: '',
					billNo:'',
					flowUrgent:1,
					hostUnit:'',
					copy:'',
					title:'',
					mainDelivery:'',
					shareNum:'',
					writingDate:'',
					fileList:[],
					issuedNum:''
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
					}],
				},
				
			}
		},
		methods: {
			selfInit(data) {
				this.dataForm.applyDate = new Date().getTime()
				this.dataForm.flowTitle = this.userInfo.userName + "的发文单"
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
