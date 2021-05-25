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
				<u-form-item label="文件标题" prop="fileTitle" v-if="judgeShow('fileTitle')">
					<u-input v-model="dataForm.fileTitle" placeholder="输入文件标题"></u-input>
				</u-form-item>
				<u-form-item label="主办单位" prop="draftedPerson" v-if="judgeShow('draftedPerson')">
					<u-input v-model="dataForm.draftedPerson" placeholder="输入主办单位"></u-input>
				</u-form-item>
				<u-form-item label="文件编号" prop="fillNum" v-if="judgeShow('fillNum')">
					<u-input v-model="dataForm.fillNum" placeholder="输入文件编号"></u-input>
				</u-form-item>
				<u-form-item label="发往单位" prop="sendUnit" v-if="judgeShow('sendUnit')">
					<u-input v-model="dataForm.sendUnit" placeholder="输入发往单位"></u-input>
				</u-form-item>
				<u-form-item label="打字" prop="typing" v-if="judgeShow('typing')">
					<u-input v-model="dataForm.typing" placeholder="输入打字"></u-input>
				</u-form-item>
				<u-form-item label="发文日期" prop="writingDate" v-if="judgeShow('writingDate')" required>
					<jnpf-date-time type="date" v-model="dataForm.writingDate" placeholder="输入发文日期"></jnpf-date-time>
				</u-form-item>
				<u-form-item label="份数" prop="shareNum" v-if="judgeShow('shareNum')">
					<u-input v-model="dataForm.shareNum" placeholder="输入份数"></u-input>
				</u-form-item>
				<u-form-item label="相关附件" prop="fileList" v-if="judgeShow('fileList')">
					<jnpf-upload v-model="dataForm.fileList"></jnpf-upload>
				</u-form-item>
				<u-form-item label="备注" prop="description" v-if="judgeShow('description')">
					<u-input v-model="dataForm.description" placeholder="输入备注" type="textarea"></u-input>
				</u-form-item>
			</view>
		</u-form>
	</view>
</template>

<script>
	import comMixin from '../mixin'
	export default {
		name: 'BatchPackNo',
		mixins: [comMixin],
		data() {
			return {
				billEnCode: 'WF_BatchPackNo',
				dataForm: {
					flowTitle: '',
					billNo:'',
					flowUrgent:1,
					fileTitle:'',
					draftedPerson:'',
					fillNum:'',
					sendUnit:'',
					typing:'',
					writingDate:'',
					shareNum:'',
					description:'',
					fileList:[]
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
					writingDate:[{
						required: true,
						message: '发文日期不能为空',
						trigger: 'change',
						type:'number'
					}]
				}
			}
		},
		methods: {
			selfInit(data) {
				this.dataForm.applyDate = new Date().getTime()
				this.dataForm.flowTitle = this.userInfo.userName + "的行文呈批申请"
				this.dataForm.applyUser = this.userInfo.userName + '/' + this.userInfo.userAccount
				if (this.userInfo.positionIds && this.userInfo.positionIds.length) {
					let list = this.userInfo.positionIds.map(o => o.name)
					this.dataForm.position = list.join(',')
				}
			}
		}
	}
</script>

<style>

</style>
