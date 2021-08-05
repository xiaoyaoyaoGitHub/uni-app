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
				<u-form-item label="员工姓名" prop="fullName" v-if="judgeShow('fullName')">
					<u-input v-model="dataForm.fullName" placeholder="请输入员工姓名" :disabled="judgeWrite('fullName')">
					</u-input>
				</u-form-item>
				<u-form-item label="所在部门" prop="department" v-if="judgeShow('department')">
					<u-input v-model="dataForm.department" placeholder="请输入所在部门" :disabled="judgeWrite('department')">
					</u-input>
				</u-form-item>
				<u-form-item label="所在职务" prop="position" v-if="judgeShow('position')">
					<u-input v-model="dataForm.position" placeholder="请输入所在职务" :disabled="judgeWrite('position')">
					</u-input>
				</u-form-item>
				<u-form-item label="申请日期" prop="applyDate" v-if="judgeShow('applyDate')">
					<jnpf-date-time type="date" v-model="dataForm.applyDate" placeholder="请输入申请日期"
						:disabled="judgeWrite('applyDate')"></jnpf-date-time>
				</u-form-item>
				<u-form-item label="证明人" prop="witness" v-if="judgeShow('witness')">
					<u-input v-model="dataForm.witness" placeholder="请输入证明人" :disabled="judgeWrite('witness')">
					</u-input>
				</u-form-item>
				<u-form-item label="补卡次数" prop="supplementNum" v-if="judgeShow('supplementNum')">
					<u-input v-model="dataForm.supplementNum" placeholder="请输入补卡次数" type="number"
						:disabled="judgeWrite('supplementNum')"></u-input>
				</u-form-item>
				<u-form-item label="开始时间" prop="startTime" v-if="judgeShow('startTime')" required>
					<jnpf-date-time type="datetime" v-model="dataForm.startTime" placeholder="请输入开始时间"
						:disabled="judgeWrite('startTime')"></jnpf-date-time>
				</u-form-item>
				<u-form-item label="结束时间" prop="endTime" v-if="judgeShow('endTime')" required>
					<jnpf-date-time type="datetime" v-model="dataForm.endTime" placeholder="请输入结束时间"
						:disabled="judgeWrite('endTime')"></jnpf-date-time>
				</u-form-item>
				<u-form-item label="备注" prop="description" v-if="judgeShow('description')" required>
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
		name: 'SupplementCard',
		mixins: [comMixin],
		data() {
			return {
				billEnCode: 'WF_SupplementCardNo',
				dataForm: {
					flowTitle: '',
					billNo: '',
					flowUrgent: 1,
					endTime: '',
					fullName: '',
					department: '',
					position: '',
					applyDate: '',
					startTime: '',
					description: '',
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
					description: [{
						required: true,
						message: '备注不能为空',
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			selfInit(data) {
				this.dataForm.applyDate = new Date().getTime()
				this.dataForm.flowTitle = this.userInfo.userName + "的补打卡申请"
				this.dataForm.fullName = this.userInfo.userName + '/' + this.userInfo.userAccount
				this.dataForm.department = this.userInfo.departmentName
				if (this.userInfo.positionIds && this.userInfo.positionIds.length) {
					let list = this.userInfo.positionIds.map(o => o.name)
					this.dataForm.position = list.join(',')
				}
			}
		}
	}
</script>
