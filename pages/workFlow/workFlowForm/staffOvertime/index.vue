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
				<u-form-item label="所在部门" prop="department" v-if="judgeShow('department')">
					<u-input v-model="dataForm.department" placeholder="请输入所在部门" :disabled="judgeWrite('department')">
					</u-input>
				</u-form-item>
				<u-form-item label="申请日期" prop="applyDate" v-if="judgeShow('applyDate')">
					<jnpf-date-time type="date" v-model="dataForm.applyDate" placeholder="请输入申请日期"
						:disabled="judgeWrite('applyDate')"></jnpf-date-time>
				</u-form-item>
				<u-form-item label="总计时间" prop="totleTime" v-if="judgeShow('totleTime')">
					<u-input v-model="dataForm.totleTime" placeholder="请输入总计时间" type="number"
						:disabled="judgeWrite('totleTime')"></u-input>
				</u-form-item>
				<u-form-item label="开始时间" prop="startTime" v-if="judgeShow('startTime')" required>
					<jnpf-date-time type="datetime" v-model="dataForm.startTime" placeholder="请输入开始时间"
						:disabled="judgeWrite('startTime')"></jnpf-date-time>
				</u-form-item>
				<u-form-item label="结束时间" prop="endTime" v-if="judgeShow('endTime')" required>
					<jnpf-date-time type="datetime" v-model="dataForm.endTime" placeholder="请输入结束时间"
						:disabled="judgeWrite('endTime')"></jnpf-date-time>
				</u-form-item>
				<u-form-item label="记入类别" prop="category" v-if="judgeShow('category')" required>
					<jnpf-select v-model="dataForm.category" placeholder="请选择下拉框组" :options="categoryList"
						:disabled="judgeWrite('category')"></jnpf-select>
				</u-form-item>
				<u-form-item label="加班事由" prop="cause" v-if="judgeShow('cause')">
					<u-input v-model="dataForm.cause" placeholder="请输入加班事由" type="textarea"
						:disabled="judgeWrite('cause')"></u-input>
				</u-form-item>
			</view>
		</u-form>
	</view>
</template>

<script>
	import comMixin from '../mixin'
	export default {
		name: 'StaffOvertime',
		mixins: [comMixin],
		data() {
			return {
				billEnCode: 'WF_StaffOvertimeNo',
				dataForm: {
					flowTitle: '',
					billNo: '',
					flowUrgent: 1,
					endTime: '',
					applyUser: '',
					department: '',
					position: '',
					applyDate: '',
					startTime: '',
					cause: '',
					category: '',
					totleTime: ''
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
					startTime: [{
						required: true,
						message: '开始时间不能为空',
						trigger: 'blur',
						type: 'number'
					}],
					endTime: [{
						required: true,
						message: '结束时间不能为空',
						trigger: 'blur',
						type: 'number'
					}],
					customer: [{
						required: true,
						message: '相关客户不能为空',
						trigger: 'blur',
					}],
					category: [{
						required: true,
						message: '相关项目不能为空',
						trigger: 'blur',
					}],
				},
				categoryList: [{
						fullName: "记入调休",
						id: "记入调休",
						checked: false
					},
					{
						fullName: "加班费",
						id: "加班费",
						checked: false
					}
				],
			}
		},
		methods: {
			selfInit(data) {
				this.dataForm.applyDate = new Date().getTime()
				this.dataForm.flowTitle = this.userInfo.userName + "的加班申请"
				this.dataForm.applyUser = this.userInfo.userName + '/' + this.userInfo.userAccount
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
