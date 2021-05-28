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
				<u-form-item label="填报人" prop="writer" v-if="judgeShow('writer')" required>
					<u-input v-model="dataForm.writer" placeholder="请输入填报人"></u-input>
				</u-form-item>
				<u-form-item label="填报日期" prop="writeDate" v-if="judgeShow('writeDate')" required>
					<jnpf-date-time type="date" v-model="dataForm.writeDate" placeholder="请输入填报日期"></jnpf-date-time>
				</u-form-item>
				<u-form-item label="客户名称" prop="customerName" v-if="judgeShow('customerName')">
					<u-input v-model="dataForm.customerName" placeholder="请输入客户名称" disabled></u-input>
				</u-form-item>
				<u-form-item label="合作人名" prop="partnerName" v-if="judgeShow('partnerName')">
					<u-input v-model="dataForm.partnerName" placeholder="请输入合作人名"></u-input>
				</u-form-item>
				<u-form-item label="模板参考" prop="standardFile" v-if="judgeShow('standardFile')">
					<u-input v-model="dataForm.standardFile" placeholder="请输入模板参考"></u-input>
				</u-form-item>
				<u-form-item label="报价类型" prop="quotationType" v-if="judgeShow('quotationType')">
					<jnpf-select v-model="dataForm.quotationType" placeholder="请选择报价类型"
						:options="quotationTypeList"></jnpf-select>
				</u-form-item>
				<u-form-item label="相关附件" prop="fileList" v-if="judgeShow('fileList')">
					<jnpf-upload v-model="dataForm.fileList"></jnpf-upload>
				</u-form-item>
				<u-form-item label="情况描述" prop="custSituation" v-if="judgeShow('custSituation')">
					<u-input v-model="dataForm.custSituation" placeholder="请输入情况描述"></u-input>
				</u-form-item>
			</view>
		</u-form>
	</view>
</template>

<script>
	import comMixin from '../mixin'
	export default {
		name: 'QuotationApproval',
		mixins: [comMixin],
		data() {
			return {
				billEnCode: 'WF_QuotationApprovalNo',
				dataForm: {
					flowTitle: '',
					billNo: '',
					flowUrgent: 1,
					customerName: '',
					partnerName: '',
					quotationType:'',
					writer: '',
					standardFile: '',
					custSituation: '',
					writeDate:'',
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
					writeDate: [{
						required: true,
						message: '填报日期不能为空',
						trigger: 'change',
						type: 'number'
					}],
					writer: [{
						required: true,
						message: '填报人不能为空',
						trigger: 'change',
					}],
				},
				quotationTypeList:[{
						fullName: "SL-I型报价",
						id:"0",
						checked:false
					},
					{
						fullName: "SL-II型报价",
						id:"1",
						checked:false
					},
					{
						fullName: "SL-III型报价",
						id:"2",
						checked:false
					},
					{
						fullName: "SL-IIh型报价",
						id:"3",
						checked:false
					}
				],
			}
		},
		methods: {
			selfInit(data) {
				this.dataForm.applyDate = new Date().getTime()
				this.dataForm.flowTitle = this.userInfo.userName + "的文件签批申请"
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
