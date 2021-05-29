<template>
	<view class="jnpf-wrap jnpf-wrap-workflow">
		<u-form :model="dataForm" :rules="rules" ref="dataForm" :errorType="['toast']" label-position="left"
			label-width="150" label-align="left">
			<u-form-item label="流程标题" prop="flowTitle" required>
				<u-input v-model="dataForm.flowTitle" placeholder="流程标题"></u-input>
			</u-form-item>
			<u-form-item label="流程编码" prop="billNo" v-if="judgeShow('billNo')" required>
				<u-input v-model="dataForm.billNo" placeholder="流程编码" ></u-input>
			</u-form-item>
			<u-form-item label="紧急程度" prop="flowUrgent" required>
				<jnpf-select v-model="dataForm.flowUrgent" placeholder="请选择紧急程度" :options="flowUrgentOptions">
				</jnpf-select>
			</u-form-item>

			<view class="jnpf-card">
				<u-form-item label="文件名称" prop="fileName" v-if="judgeShow('fileName')" required>
					<u-input v-model="dataForm.fileName" placeholder="请输入文件名称"></u-input>
				</u-form-item>
				<u-form-item label="文件编号" prop="fillNum" v-if="judgeShow('fillNum')" required>
					<u-input v-model="dataForm.fillNum" placeholder="请输入文件编号"></u-input>
				</u-form-item>
				<u-form-item label="拟稿人" prop="draftedPerson" v-if="judgeShow('draftedPerson')">
					<u-input v-model="dataForm.draftedPerson" placeholder="请输入拟稿人" ></u-input>
				</u-form-item>
				<u-form-item label="签阅人" prop="reader" v-if="judgeShow('reader')">
					<u-input v-model="dataForm.reader" placeholder="请输入签阅人"></u-input>
				</u-form-item>
				<u-form-item label="文件拟办" prop="fillPreparation" v-if="judgeShow('fillPreparation')">
					<u-input v-model="dataForm.fillPreparation" placeholder="请输入文件拟办"></u-input>
				</u-form-item>
				<u-form-item label="签阅时间" prop="checkDate" v-if="judgeShow('checkDate')" required>
					<jnpf-date-time type="datetime" v-model="dataForm.checkDate" placeholder="请输入签阅时间"></jnpf-date-time>
				</u-form-item>
				<u-form-item label="发稿日期" prop="publicationDate" v-if="judgeShow('publicationDate')" required>
					<jnpf-date-time type="date" v-model="dataForm.publicationDate" placeholder="请输入发稿日期"></jnpf-date-time>
				</u-form-item>
				<u-form-item label="相关附件" prop="fileList" v-if="judgeShow('fileList')">
					<jnpf-upload v-model="dataForm.fileList"></jnpf-upload>
				</u-form-item>
				<u-form-item label="文件内容" prop="documentContent" v-if="judgeShow('documentContent')">
					<u-input v-model="dataForm.documentContent" placeholder="请输入文件内容" type="textarea"></u-input>
				</u-form-item>
				<u-form-item label="建议栏" prop="adviceColumn" v-if="judgeShow('adviceColumn')">
					<u-input v-model="dataForm.adviceColumn" placeholder="请输入建议" type="textarea"></u-input>
				</u-form-item>
			</view>
		</u-form>
	</view>
</template>

<script>
	import comMixin from '../mixin'
	export default {
		name: 'DocumentSigningNo',
		mixins: [comMixin],
		data() {
			return {
				billEnCode: 'WF_DocumentSigningNo',
				dataForm: {
					flowTitle: '',
					billNo: '',
					flowUrgent: 1,
					draftedPerson: '',
					reader: '',
					documentContent: '',
					fileName: '',
					fillPreparation: '',
					fillNum: '',
					checkDate:'',
					fileList:[],
					publicationDate:'',
					adviceColumn:''
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
					checkDate: [{
						required: true,
						message: '签阅时间不能为空',
						trigger: 'change',
						type: 'number'
					}],
					publicationDate: [{
						required: true,
						message: '发稿日期不能为空',
						trigger: 'change',
						type: 'number'
					}],
					
				}
			}
		},
		methods: {
			selfInit(data) {
				this.dataForm.applyDate = new Date().getTime()
				this.dataForm.flowTitle = this.userInfo.userName + "的文件签阅申请"
				this.dataForm.applyUser = this.userInfo.userName + '/' + this.userInfo.userAccount
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
