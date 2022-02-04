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
				<u-form-item label="出差人员" prop="travelMan" v-if="judgeShow('travelMan')">
					<u-input v-model="dataForm.travelMan" placeholder="请输入出差人员" :disabled="judgeWrite('travelMan')">
					</u-input>
				</u-form-item>
				<u-form-item label="申请日期" prop="applyDate" v-if="judgeShow('applyDate')">
					<cudt-date-time type="date" v-model="dataForm.applyDate" placeholder="请输入申请日期"
						:disabled="judgeWrite('applyDate')"></cudt-date-time>
				</u-form-item>
				<u-form-item label="所属部门" prop="departmental" v-if="judgeShow('departmental')">
					<u-input v-model="dataForm.departmental" placeholder="请输入所属部门"
						:disabled="judgeWrite('departmental')"></u-input>
				</u-form-item>
				<u-form-item label="员工职务" prop="position" v-if="judgeShow('position')">
					<u-input v-model="dataForm.position" placeholder="请输入员工职务" :disabled="judgeWrite('position')">
					</u-input>
				</u-form-item>
				<u-form-item label="开始时间" prop="startDate" v-if="judgeShow('startDate')" required>
					<cudt-date-time type="datetime" v-model="dataForm.startDate" placeholder="请输入开始时间"
						:disabled="judgeWrite('startDate')"></cudt-date-time>
				</u-form-item>
				<u-form-item label="结束时间" prop="endDate" v-if="judgeShow('endDate')" required>
					<cudt-date-time type="datetime" v-model="dataForm.endDate" placeholder="请输入结束时间"
						:disabled="judgeWrite('endDate')"></cudt-date-time>
				</u-form-item>
				<u-form-item label="起始地点" prop="startPlace" v-if="judgeShow('startPlace')" required>
					<u-input v-model="dataForm.startPlace" placeholder="请输入起始地点" :disabled="judgeWrite('startPlace')">
					</u-input>
				</u-form-item>
				<u-form-item label="目的地" prop="destination" v-if="judgeShow('destination')" required>
					<u-input v-model="dataForm.destination" placeholder="请输入目的地" :disabled="judgeWrite('destination')">
					</u-input>
				</u-form-item>
				<u-form-item label="预支旅费" prop="prepaidTravel" v-if="judgeShow('prepaidTravel')">
					<u-input v-model="dataForm.prepaidTravel" placeholder="请输入预支旅费" type="number"
						:disabled="judgeWrite('prepaidTravel')"></u-input>
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
		name: 'TravelApply',
		mixins: [comMixin],
		data() {
			return {
				billEnCode: 'WF_TravelApplyNo',
				dataForm: {
					flowTitle: '',
					billNo: '',
					flowUrgent: 1,
					endDate: '',
					travelMan: '',
					departmental: '',
					position: '',
					applyDate: '',
					startDate: '',
					description: '',
					prepaidTravel: '',
					destination: '',
					startPlace: ''
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
						message: '开始时间不能为空',
						trigger: 'blur',
						type: 'number'
					}],
					endDate: [{
						required: true,
						message: '结束时间不能为空',
						trigger: 'blur',
						type: 'number'
					}],
					startPlace: [{
						required: true,
						message: '起始地点不能为空',
						trigger: 'blur',
					}],
					destination: [{
						required: true,
						message: '目的地不能为空',
						trigger: 'blur',
					}]
				}
			}
		},
		methods: {
			selfInit(data) {
				this.dataForm.applyDate = new Date().getTime()
				this.dataForm.flowTitle = this.userInfo.userName + "的出差预支申请"
				this.dataForm.travelMan = this.userInfo.userName + '/' + this.userInfo.userAccount
				this.dataForm.departmental = this.userInfo.departmentName
				if (this.userInfo.positionIds && this.userInfo.positionIds.length) {
					let list = this.userInfo.positionIds.map(o => o.name)
					this.dataForm.position = list.join(',')
				}
			}
		}
	}
</script>
