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
				<u-form-item label="申请人员" prop="applyUser" v-if="judgeShow('applyUser')">
					<u-input v-model="dataForm.applyUser" placeholder="请输入申请人员" :disabled="judgeWrite('applyUser')">
					</u-input>
				</u-form-item>
				<u-form-item label="申请部门" prop="departmental" v-if="judgeShow('departmental')">
					<u-input v-model="dataForm.departmental" placeholder="请输入申请部门"
						:disabled="judgeWrite('departmental')"></u-input>
				</u-form-item>
				<u-form-item label="申请日期" prop="applyDate" v-if="judgeShow('applyDate')">
					<jnpf-date-time type="date" v-model="dataForm.applyDate" placeholder="请输入申请日期"
						:disabled="judgeWrite('applyDate')"></jnpf-date-time>
				</u-form-item>
				<u-form-item label="付款单位" prop="paymentUnit" v-if="judgeShow('paymentUnit')">
					<u-input v-model="dataForm.paymentUnit" placeholder="请输入付款单位" :disabled="judgeWrite('paymentUnit')">
					</u-input>
				</u-form-item>
				<u-form-item label="用途名称" prop="purposeName" v-if="judgeShow('purposeName')">
					<u-input v-model="dataForm.purposeName" placeholder="请输入用途名称" :disabled="judgeWrite('purposeName')">
					</u-input>
				</u-form-item>
				<u-form-item label="项目类别" prop="projectCategory" v-if="judgeShow('projectCategory')">
					<u-input v-model="dataForm.projectCategory" placeholder="请输入项目类别"
						:disabled="judgeWrite('projectCategory')"></u-input>
				</u-form-item>
				<u-form-item label="项目负责人" prop="projectLeader" v-if="judgeShow('projectLeader')">
					<u-input v-model="dataForm.projectLeader" placeholder="请输入项目负责人"
						:disabled="judgeWrite('projectLeader')"></u-input>
				</u-form-item>
			</view>
			<view class="jnpf-card">
				<u-form-item label="开户银行" prop="openingBank" v-if="judgeShow('openingBank')">
					<u-input v-model="dataForm.openingBank" placeholder="请输入开户银行" type="number"
						:disabled="judgeWrite('openingBank')"></u-input>
				</u-form-item>
				<u-form-item label="收款人账号" prop="beneficiaryAccount" v-if="judgeShow('beneficiaryAccount')">
					<u-input v-model="dataForm.beneficiaryAccount" placeholder="请输入收款人账号" type="number"
						:disabled="judgeWrite('beneficiaryAccount')"></u-input>
				</u-form-item>
				<u-form-item label="联系方式" prop="receivableContact" v-if="judgeShow('receivableContact')">
					<u-input v-model="dataForm.receivableContact" placeholder="请输入联系方式" type="number"
						:disabled="judgeWrite('receivableContact')"></u-input>
				</u-form-item>
				<u-form-item label="申请金额" prop="applyAmount" v-if="judgeShow('applyAmount')">
					<u-input v-model="dataForm.applyAmount" placeholder="请输入申请金额" type="number"
						:disabled="judgeWrite('applyAmount')"></u-input>
				</u-form-item>
				<u-form-item label="结算方式" prop="settlementMethod" v-if="judgeShow('settlementMethod')" required>
					<jnpf-select v-model="dataForm.settlementMethod" placeholder="请选择结算方式"
						:options="paymentMethodOptions" :disabled="judgeWrite('settlementMethod')" :props="payProps"></jnpf-select>
				</u-form-item>
				<u-form-item label="付款类型" prop="paymentType" v-if="judgeShow('paymentType')" required>
					<jnpf-select v-model="dataForm.paymentType" placeholder="请选择付款类型" :options="paymentTypeList"
						:disabled="judgeWrite('paymentType')">
					</jnpf-select>
				</u-form-item>
				<u-form-item label="付款金额" prop="amountPaid" v-if="judgeShow('amountPaid')">
					<u-input v-model="dataForm.amountPaid" placeholder="请输入收付款金额" type="number"
						:disabled="judgeWrite('amountPaid')"></u-input>
				</u-form-item>
				<u-form-item label="备注" prop="description" v-if="judgeShow('description')">
					<u-input v-model="dataForm.description" placeholder="请输入备注" type="textarea"
						:disabled="judgeWrite('description')"></u-input>
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
					projectLeader: '',
					projectCategory: '',
					applyUser: '',
					departmental: '',
					position: '',
					applyDate: '',
					purposeName: '',
					paymentUnit: '',
					beneficiaryAccount: '',
					openingBank: '',
					paymentType: '',
					settlementMethod: '',
					applyAmount:'',
					receivableContact:''
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
					settlementMethod: [{
						required: true,
						message: '结算方式不能为空',
						trigger: 'blur',
					}],
					paymentType: [{
						required: true,
						message: '付款类型不能为空',
						trigger: 'blur'
					}],
					receivableContact:[{
						required: true,
						pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
						message: '手机号码不正确',
						type: 'string',
						trigger: ['change', 'blur'],
					}],
					
				},
				paymentTypeList: [{
						fullName: '订金',
						id: '订金',
						checked: false
					},
					{
						fullName: '首付',
						id: '首付',
						checked: false
					},
					{
						fullName: '尾款',
						id: '尾款',
						checked: false
					},
					{
						fullName: '全额',
						id: '全额',
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
				this.dataForm.departmental = this.userInfo.departmentName
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
