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
				<u-form-item label="申请人员" prop="applyUser" v-if="judgeShow('applyUser')">
					<u-input v-model="dataForm.applyUser" placeholder="请输入申请人员" :disabled="judgeWrite('applyUser')">
					</u-input>
				</u-form-item>
				<u-form-item label="借阅部门" prop="borrowingDepartment" v-if="judgeShow('borrowingDepartment')">
					<u-input v-model="dataForm.borrowingDepartment" placeholder="请输入申请人员"
						:disabled="judgeWrite('borrowingDepartment')"></u-input>
				</u-form-item>
				<u-form-item label="档案名称" prop="archivesName" v-if="judgeShow('archivesName')" required>
					<u-input v-model="dataForm.archivesName" placeholder="请输入档案名称"
						:disabled="judgeWrite('archivesName')"></u-input>
				</u-form-item>
				<u-form-item label="档案编号" prop="archivesId" v-if="judgeShow('archivesId')" required>
					<u-input v-model="dataForm.archivesId" placeholder="请输入档案编号" :disabled="judgeWrite('archivesId')">
					</u-input>
				</u-form-item>
				<u-form-item label="借阅时间" prop="borrowingDate" v-if="judgeShow('borrowingDate')" required>
					<cudt-date-time type="datetime" v-model="dataForm.borrowingDate" placeholder="请输入借阅时间"
						:disabled="judgeWrite('borrowingDate')"></cudt-date-time>
				</u-form-item>
				<u-form-item label="归还时间" prop="returnDate" v-if="judgeShow('returnDate')" required>
					<cudt-date-time type="datetime" v-model="dataForm.returnDate" placeholder="请输入归还时间"
						:disabled="judgeWrite('returnDate')"></cudt-date-time>
				</u-form-item>
				<u-form-item label="借阅方式" prop="borrowMode" v-if="judgeShow('borrowMode')" required>
					<cudt-select v-model="dataForm.borrowMode" placeholder="请选择借阅方式" :options="borrowModeList"
						:disabled="judgeWrite('borrowMode')"></cudt-select>
				</u-form-item>
				<u-form-item label="档案属性" prop="archivalAttributes" v-if="judgeShow('archivalAttributes')" required>
					<cudt-select v-model="dataForm.archivalAttributes" placeholder="请选择档案属性" :options="attributeList"
						:disabled="judgeWrite('archivalAttributes')"></cudt-select>
				</u-form-item>
				<u-form-item label="申请原因" prop="applyReason" v-if="judgeShow('applyReason')">
					<u-input v-model="dataForm.applyReason" placeholder="请输入申请原因" :disabled="judgeWrite('applyReason')">
					</u-input>
				</u-form-item>
			</view>
		</u-form>
	</view>
</template>

<script>
	import comMixin from '../mixin'
	export default {
		name: 'ArchivalBorrow',
		mixins: [comMixin],
		data() {
			return {
				billEnCode: 'WF_ArchivalBorrowNo',
				dataForm: {
					flowTitle: '',
					billNo: '',
					flowUrgent: 1,
					applyUser: '',
					borrowingDepartment: '',
					archivesName: '',
					archivesId: '',
					borrowingDate: '',
					returnDate: '',
					archivalAttributes: '',
					borrowMode: '',
					applyReason: ''
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
					borrowMode: [{
						required: true,
						message: '借阅方式不能为空',
						trigger: 'change'

					}],
					archivalAttributes: [{
						required: true,
						message: '档案属性不能为空',
						trigger: 'change'

					}],
					archivesName: [{
						required: true,
						message: '档案名称不能为空',
						trigger: 'change',
					}],
					archivesId: [{
						required: true,
						message: '档案编号不能为空',
						trigger: 'change'
					}],
					borrowingDate: [{
						required: true,
						message: '借阅时间不能为空',
						trigger: 'change',
						type: 'number'
					}],
					returnDate: [{
						required: true,
						message: '归还时间不能为空',
						trigger: 'change',
						type: 'number'
					}]
				},
				borrowModeList: [{
						fullName: '查阅',
						id: '查阅',
						checked: false
					},
					{
						fullName: '复印',
						id: '复印',
						checked: false
					},
					{
						fullName: '外借',
						id: '外借',
						checked: false
					},
					{
						fullName: '其他',
						id: '其他',
						checked: false
					}
				],
				attributeList: [{
						fullName: '原件',
						id: '原件',
						checked: false
					},
					{
						fullName: '复印件',
						id: '复印件',
						checked: false
					},
					{
						fullName: '其他',
						id: '其他',
						checked: false
					}
				]
			}
		},
		methods: {
			selfInit(data) {
				this.dataForm.applyDate = new Date().getTime()
				this.dataForm.flowTitle = this.userInfo.userName + "的档案借阅申请"
				this.dataForm.applyUser = this.userInfo.userName + '/' + this.userInfo.userAccount
				this.dataForm.borrowingDepartment = this.userInfo.departmentName
			}
		}
	}
</script>

<style>

</style>
