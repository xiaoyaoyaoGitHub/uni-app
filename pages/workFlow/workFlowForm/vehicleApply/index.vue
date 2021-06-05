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
				<u-form-item label="所属部门" prop="department" v-if="judgeShow('department')">
					<u-input v-model="dataForm.department" placeholder="请输入所属部门" :disabled="judgeWrite('department')">
					</u-input>
				</u-form-item>
				<u-form-item label="用车人员" prop="carMan" v-if="judgeShow('carMan')">
					<u-input v-model="dataForm.carMan" placeholder="请输入用车人员" :disabled="judgeWrite('carMan')"></u-input>
				</u-form-item>
				<u-form-item label="用车时间" prop="startDate" v-if="judgeShow('startDate')" required>
					<jnpf-date-time type="datetime" v-model="dataForm.startDate" placeholder="请输入用车时间"
						:disabled="judgeWrite('startDate')"></jnpf-date-time>
				</u-form-item>
				<u-form-item label="还车时间" prop="endDate" v-if="judgeShow('endDate')" required>
					<jnpf-date-time type="datetime" v-model="dataForm.endDate" placeholder="请输入还车时间"
						:disabled="judgeWrite('endDate')"></jnpf-date-time>
				</u-form-item>
				<u-form-item label="车牌号" prop="plateNum" v-if="judgeShow('plateNum')">
					<u-input v-model="dataForm.plateNum" placeholder="请输入车牌号" :disabled="judgeWrite('plateNum')">
					</u-input>
				</u-form-item>
				<u-form-item label="目的地" prop="destination" v-if="judgeShow('destination')">
					<u-input v-model="dataForm.destination" placeholder="请输入目的地" :disabled="judgeWrite('destination')">
					</u-input>
				</u-form-item>
				<u-form-item label="路费金额" prop="roadFee" v-if="judgeShow('roadFee')">
					<u-input v-model="dataForm.roadFee" placeholder="请输入路费金额" type="number"
						:disabled="judgeWrite('roadFee')"></u-input>
				</u-form-item>
				<u-form-item label="公里数" prop="kilometreNum" v-if="judgeShow('kilometreNum')">
					<u-input v-model="dataForm.kilometreNum" placeholder="请输入公里数"
						:disabled="judgeWrite('kilometreNum')"></u-input>
				</u-form-item>
				<u-form-item label="随行人数" prop="entourage" v-if="judgeShow('entourage')">
					<u-input v-model="dataForm.entourage" placeholder="请输入随行人数" :disabled="judgeWrite('entourage')">
					</u-input>
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
		name: 'VehicleApply',
		mixins: [comMixin],
		data() {
			return {
				billEnCode: 'WF_VehicleApplyNo',
				dataForm: {
					flowTitle: '',
					billNo: '',
					flowUrgent: 1,
					endDate: '',
					carMan: '',
					department: '',
					startDate: '',
					description: '',
					roadFee: '',
					destination: '',
					kilometreNum: '',
					plateNum: '',
					entourage: ''
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
					startDate: [{
						required: true,
						message: '用车时间不能为空',
						trigger: 'blur',
						type: 'number'
					}],
					endDate: [{
						required: true,
						message: '还车时间不能为空',
						trigger: 'blur',
						type: 'number'
					}],


				}
			}
		},
		methods: {
			selfInit(data) {
				console.log(this.userInfo)
				this.dataForm.applyDate = new Date().getTime()
				this.dataForm.flowTitle = this.userInfo.userName + "的车辆申请"
				this.dataForm.carMan = this.userInfo.userName + '/' + this.userInfo.userAccount
				this.dataForm.department = this.userInfo.departmentName
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
