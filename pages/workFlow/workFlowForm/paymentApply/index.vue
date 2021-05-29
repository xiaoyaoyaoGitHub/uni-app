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
				<u-form-item label="申请人员" prop="applyUser" v-if="judgeShow('applyUser')">
					<u-input v-model="dataForm.applyUser" placeholder="请输入申请人员"></u-input>
				</u-form-item>
				<u-form-item label="申请部门" prop="applyDept" v-if="judgeShow('applyDept')">
					<u-input v-model="dataForm.applyDept" placeholder="请输入申请部门"></u-input>
				</u-form-item>
				<u-form-item label="申请日期" prop="applyDate" v-if="judgeShow('applyDate')">
					<jnpf-date-time type="date" v-model="dataForm.applyDate" placeholder="请输入申请日期"></jnpf-date-time>
				</u-form-item>
				<u-form-item label="付款单位" prop="paymentUnit" v-if="judgeShow('paymentUnit')">
					<u-input v-model="dataForm.paymentUnit" placeholder="请输入付款单位"></u-input>
				</u-form-item>
				<u-form-item label="用途名称" prop="purposeName" v-if="judgeShow('purposeName')">
					<u-input v-model="dataForm.purposeName" placeholder="请输入用途名称"></u-input>
				</u-form-item>
				<u-form-item label="项目类别" prop="projectCategory" v-if="judgeShow('projectCategory')">
					<u-input v-model="dataForm.projectCategory" placeholder="请输入项目类别"></u-input>
				</u-form-item>
				<u-form-item label="项目负责人" prop="articlesNum" v-if="judgeShow('articlesNum')">
					<u-input v-model="dataForm.articlesNum" placeholder="请输入项目负责人"></u-input>
				</u-form-item>
			</view>
			<view class="jnpf-card">
				<u-form-item label="开户银行" prop="openingBank" v-if="judgeShow('openingBank')">
					<u-input v-model="dataForm.openingBank" placeholder="请输入开户银行" type="number"></u-input>
				</u-form-item>
				<u-form-item label="收款人账号" prop="beneficiaryAccount" v-if="judgeShow('beneficiaryAccount')">
					<u-input v-model="dataForm.beneficiaryAccount" placeholder="请输入收款人账号" type="number"></u-input>
				</u-form-item>
				<u-form-item label="结算方式" prop="beneficiaryAccount" v-if="judgeShow('beneficiaryAccount')" required>
					<jnpf-select v-model="dataForm.beneficiaryAccount" placeholder="请选择结算方式"
						:options="paymentMethodOptions"></jnpf-select>
				</u-form-item>
				<u-form-item label="付款类型" prop="paymentType" v-if="judgeShow('paymentType')" required>
					<jnpf-select v-model="dataForm.paymentType" placeholder="请选择付款类型" :options="paymentTypeList">
					</jnpf-select>
				</u-form-item>
				<u-form-item label="付款金额" prop="amountPaid" v-if="judgeShow('amountPaid')">
					<u-input v-model="dataForm.amountPaid" placeholder="请输入收付款金额" type="number"></u-input>
				</u-form-item>
				<u-form-item label="备注" prop="description" v-if="judgeShow('description')">
					<u-input v-model="dataForm.description" placeholder="请输入备注" type="textarea"></u-input>
				</u-form-item>
			</view>
		</u-form>
	</view>
</template>

<script>
	import comMixin from '../mixin'
	export default {
		name: 'PaymentApply',
		mixins: [comMixin],
		data() {
			return {
				billEnCode: 'WF_PaymentApplyNo',
				dataForm: {
					flowTitle: '',
					billNo: '',
					flowUrgent: 1,
					articlesNum: '',
					projectCategory: '',
					applyUser: '',
					applyDept: '',
					position: '',
					applyDate: '',
					purposeName: '',
					paymentUnit: '',
					beneficiaryAccount: '',
					openingBank: ''
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
					}]
				},
				paymentTypeList: [{
						fullName: '订金',
						id: '1',
						checked: false
					},
					{
						fullName: '首付',
						id: '2',
						checked: false
					},
					{
						fullName: '尾款',
						id: '3',
						checked: false
					},
					{
						fullName: '全额',
						id: '4',
						checked: false
					}
				],
			}
		},
		methods: {
			selfInit(data) {
				this.dataForm.applyDate = new Date().getTime()
				this.dataForm.flowTitle = this.userInfo.userName + "的付款申请"
				this.dataForm.applyUser = this.userInfo.userName + '/' + this.userInfo.userAccount
				this.dataForm.applyDept = this.userInfo.departmentName
				if (this.userInfo.positionIds && this.userInfo.positionIds.length) {
					let list = this.userInfo.positionIds.map(o => o.name)
					this.dataForm.position = list.join(',')
				}
			},
			beforeInit() {
				this.getPaymentMethodOptions()
			}
		}
	}
</script>

<style>

</style>
