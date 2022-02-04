<template>
	<view class="cudt-wrap cudt-wrap-workflow">
		<u-form :model="dataForm" :rules="rules" ref="dataForm" :errorType="['toast']" label-position="left"
			label-width="150" label-align="left">
			<u-form-item label="流程标题" prop="flowTitle" v-if="judgeShow('flowTitle')" required>
				<u-input v-model="dataForm.flowTitle" placeholder="流程标题" :disabled="judgeWrite('flowTitle')"></u-input>
			</u-form-item>
			<u-form-item label="流程编码" prop="billNo" v-if="judgeShow('billNo')" required>
				<u-input v-model="dataForm.billNo" placeholder="流程编码" disabled></u-input>
			</u-form-item>
			<u-form-item label="紧急程度" prop="flowUrgent" v-if="judgeShow('flowUrgent')" required>
				<cudt-select v-model="dataForm.flowUrgent" placeholder="请选择紧急程度" :options="flowUrgentOptions"
					:disabled="judgeWrite('flowUrgent')">
				</cudt-select>
			</u-form-item>

			<view class="cudt-card">
				<u-form-item label="车牌号" prop="plateNum" v-if="judgeShow('plateNum')">
					<u-input v-model="dataForm.plateNum" placeholder="请输入车牌号" :disabled="judgeWrite('plateNum')">
					</u-input>
				</u-form-item>
				<u-form-item label="驾驶人" prop="driver" v-if="judgeShow('driver')">
					<u-input v-model="dataForm.driver" placeholder="请输入驾驶人" :disabled="judgeWrite('driver')"></u-input>
				</u-form-item>
				<u-form-item label="负责人" prop="leadingOfficial" v-if="judgeShow('leadingOfficial')">
					<u-input v-model="dataForm.leadingOfficial" placeholder="请输入负责人"
						:disabled="judgeWrite('leadingOfficial')"></u-input>
				</u-form-item>
				<u-form-item label="违章日期" prop="peccancyDate" v-if="judgeShow('peccancyDate')" required>
					<cudt-date-time type="datetime" v-model="dataForm.peccancyDate" placeholder="请输入违章日期"
						:disabled="judgeWrite('peccancyDate')"></cudt-date-time>
				</u-form-item>
				<u-form-item label="通知日期" prop="noticeDate" v-if="judgeShow('noticeDate')" required>
					<cudt-date-time type="datetime" v-model="dataForm.noticeDate" placeholder="请输入通知日期"
						:disabled="judgeWrite('noticeDate')"></cudt-date-time>
				</u-form-item>
				<u-form-item label="限处理日期" prop="limitDate" v-if="judgeShow('limitDate')" required>
					<cudt-date-time type="datetime" v-model="dataForm.limitDate" placeholder="请输入限处理日期"
						:disabled="judgeWrite('limitDate')"></cudt-date-time>
				</u-form-item>
			</view>
			<view class="cudt-card">
				<u-form-item label="违章地点" prop="violationSite" v-if="judgeShow('violationSite')">
					<u-input v-model="dataForm.violationSite" placeholder="请输入违章地点"
						:disabled="judgeWrite('violationSite')"></u-input>
				</u-form-item>
				<u-form-item label="违章行为" prop="violationBehavior" v-if="judgeShow('violationBehavior')">
					<u-input v-model="dataForm.violationBehavior" placeholder="请输入违章行为"
						:disabled="judgeWrite('violationBehavior')"></u-input>
				</u-form-item>
				<u-form-item label="违章扣分" prop="deduction" v-if="judgeShow('deduction')">
					<u-input v-model="dataForm.deduction" placeholder="请输入违章扣分" :disabled="judgeWrite('deduction')">
					</u-input>
				</u-form-item>
				<u-form-item label="违章罚款" prop="amountMoney" v-if="judgeShow('amountMoney')">
					<u-input v-model="dataForm.amountMoney" placeholder="请输入违章罚款" type="number"
						:disabled="judgeWrite('amountMoney')"></u-input>
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
		name: 'ViolationHandling',
		mixins: [comMixin],
		data() {
			return {
				billEnCode: 'WF_ViolationHandlingNo',
				dataForm: {
					flowTitle: '',
					billNo: '',
					flowUrgent: 1,
					noticeDate: '',
					leadingOfficial: '',
					peccancyDate: '',
					description: '',
					violationBehavior: '',
					violationSite: '',
					deduction: '',
					plateNum: '',
					amountMoney: '',
					limitDate: '',
					driver: ''
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
					peccancyDate: [{
						required: true,
						message: '违章日期不能为空',
						trigger: 'blur',
						type: 'number'
					}],
					noticeDate: [{
						required: true,
						message: '通知日期不能为空',
						trigger: 'blur',
						type: 'number'
					}],

					limitDate: [{
						required: true,
						message: '限处理日期不能为空',
						trigger: 'blur',
						type: 'number'
					}],
				}
			}
		},
		methods: {
			selfInit(data) {
				this.dataForm.flowTitle = this.userInfo.userName + "的违章处理申请"
			},
		}
	}
</script>

<style>

</style>
