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
				<u-form-item label="发件人" prop="drawPeople" v-if="judgeShow('drawPeople')">
					<u-input v-model="dataForm.drawPeople" placeholder="请输入发件人"></u-input>
				</u-form-item>
				<u-form-item label="发件部门" prop="issuingDepartment" v-if="judgeShow('issuingDepartment')">
					<u-input v-model="dataForm.issuingDepartment" placeholder="请输入发件部门" ></u-input>
				</u-form-item>
				<u-form-item label="发件日期" prop="toDate" v-if="judgeShow('toDate')" required>
					<jnpf-date-time type="date" v-model="dataForm.toDate" placeholder="请输入发件日期"></jnpf-date-time>
				</u-form-item>
				<u-form-item label="收件部门" prop="serviceDepartment" v-if="judgeShow('serviceDepartment')">
					<u-input v-model="dataForm.serviceDepartment" placeholder="请输入收件部门"></u-input>
				</u-form-item>
				<u-form-item label="收件人" prop="recipients" v-if="judgeShow('recipients')">
					<u-input v-model="dataForm.recipients" placeholder="请输入收件人"></u-input>
				</u-form-item>
				<u-form-item label="收件日期" prop="collectionDate" v-if="judgeShow('collectionDate')" required>
					<jnpf-date-time type="date" v-model="dataForm.collectionDate" placeholder="请输入收件日期"></jnpf-date-time>
				</u-form-item>
				<u-form-item label="协调事项" prop="coordination" v-if="judgeShow('coordination')">
					<u-input v-model="dataForm.coordination" placeholder="请输入协调事项" type="textarea"></u-input>
				</u-form-item>
				<u-form-item label="相关附件" prop="fileJson" v-if="judgeShow('fileJson')">
					<jnpf-file :list="fileList"/>
				</u-form-item>
			</view>
		</u-form>
	</view>
</template>

<script>
	import comMixin from '../mixin'
	export default {
		name: 'WorkContactSheet',
		mixins: [comMixin],
		data() {
			return {
				billEnCode: 'WF_WorkContactSheetNo',
				dataForm: {
					flowTitle: '',
					billNo: '',
					flowUrgent: 1,
					issuingDepartment: '',
					serviceDepartment: '',
					drawPeople: '',
					toDate:'',
					fileJson:'',
					recipients:''
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
					toDate: [{
						required: true,
						message: '发件日期不能为空',
						trigger: 'change',
						type: 'number'
					}],
					collectionDate: [{
						required: true,
						message: '收件日期不能为空',
						trigger: 'change',
						type: 'number'
					}],
				},
			}
		},
		methods: {
			selfInit(data) {
				this.dataForm.flowTitle = this.userInfo.userName + "的工作联系单"
			},
		}
	}
</script>

<style>

</style>
