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
				<u-form-item label="收文标题" prop="receiptTitle" v-if="judgeShow('receiptTitle')">
					<u-input v-model="dataForm.receiptTitle" placeholder="请输入收文标题"></u-input>
				</u-form-item>
				<u-form-item label="收文部门" prop="department" v-if="judgeShow('department')">
					<u-input v-model="dataForm.department" placeholder="请输入收文部门" ></u-input>
				</u-form-item>
				<u-form-item label="收文人" prop="collector" v-if="judgeShow('collector')">
					<u-input v-model="dataForm.collector" placeholder="请输入收文人"></u-input>
				</u-form-item>
				<u-form-item label="收文日期" prop="receiptDate" v-if="judgeShow('receiptDate')" required>
					<jnpf-date-time type="date" v-model="dataForm.receiptDate" placeholder="请输入收文日期"></jnpf-date-time>
				</u-form-item>
				<u-form-item label="收文简述" prop="receiptPaper" v-if="judgeShow('receiptPaper')">
					<u-input v-model="dataForm.receiptPaper" placeholder="请输入收文简述" type="textarea"></u-input>
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
		name: 'ReceiptSign',
		mixins: [comMixin],
		data() {
			return {
				billEnCode: 'WF_ReceiptSignNo',
				dataForm: {
					flowTitle: '',
					billNo: '',
					flowUrgent: 1,
					department: '',
					collector: '',
					receiptTitle: '',
					receiptDate:'',
					fileJson:'',
					receiptPaper:''
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
				this.dataForm.flowTitle = this.userInfo.userName + "的收文签呈单"
			},
		}
	}
</script>

<style>

</style>
