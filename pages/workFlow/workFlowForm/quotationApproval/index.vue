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
				<jnpf-select v-model="dataForm.flowUrgent" placeholder="请选择紧急程度" :options="flowUrgentOptions"
					:disabled="judgeWrite('flowUrgent')">
				</jnpf-select>
			</u-form-item>
			<view class="jnpf-card">
				<u-form-item label="填报人" prop="writer" v-if="judgeShow('writer')" required>
					<u-input v-model="dataForm.writer" placeholder="请输入填报人" :disabled="judgeWrite('writer')"></u-input>
				</u-form-item>
				<u-form-item label="填报日期" prop="writeDate" v-if="judgeShow('writeDate')" required>
					<jnpf-date-time type="date" v-model="dataForm.writeDate" placeholder="请输入填报日期"
						:disabled="judgeWrite('writeDate')"></jnpf-date-time>
				</u-form-item>
				<u-form-item label="客户名称" prop="customerName" v-if="judgeShow('customerName')">
					<u-input v-model="dataForm.customerName" placeholder="请输入客户名称"
						:disabled="judgeWrite('customerName')"></u-input>
				</u-form-item>
				<u-form-item label="合作人名" prop="partnerName" v-if="judgeShow('partnerName')">
					<u-input v-model="dataForm.partnerName" placeholder="请输入合作人名" :disabled="judgeWrite('partnerName')">
					</u-input>
				</u-form-item>
				<u-form-item label="模板参考" prop="standardFile" v-if="judgeShow('standardFile')">
					<u-input v-model="dataForm.standardFile" placeholder="请输入模板参考"
						:disabled="judgeWrite('standardFile')"></u-input>
				</u-form-item>
				<u-form-item label="报价类型" prop="quotationType" v-if="judgeShow('quotationType')">
					<jnpf-select v-model="dataForm.quotationType" placeholder="请选择报价类型" :options="quotationTypeList"
						:disabled="judgeWrite('quotationType')"></jnpf-select>
				</u-form-item>
				<u-form-item label="相关附件" prop="fileJson" v-if="judgeShow('fileJson')">
					<jnpf-file :list="fileList" :disabled="judgeWrite('fileJson')" />
				</u-form-item>
				<u-form-item label="情况描述" prop="custSituation" v-if="judgeShow('custSituation')">
					<u-input v-model="dataForm.custSituation" placeholder="请输入情况描述"
						:disabled="judgeWrite('custSituation')"></u-input>
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
					quotationType: '',
					writer: '',
					standardFile: '',
					custSituation: '',
					writeDate: '',
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
				quotationTypeList: [{
						fullName: "SL-I型报价",
						id: "SL-I型报价",
						checked: false
					},
					{
						fullName: "SL-II型报价",
						id: "SL-II型报价",
						checked: false
					},
					{
						fullName: "SL-III型报价",
						id: "SL-III型报价",
						checked: false
					},
					{
						fullName: "SL-IIh型报价",
						id: "SL-IIh型报价",
						checked: false
					}
				],
			}
		},
		methods: {
			selfInit(data) {
				this.dataForm.flowTitle = this.userInfo.userName + "的报价审批表"
			},
		}
	}
</script>

<style>

</style>
