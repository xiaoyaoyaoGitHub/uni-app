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
				<u-form-item label="所属部门" prop="department" v-if="judgeShow('department')">
					<u-input v-model="dataForm.department" placeholder="请输入所属部门" :disabled="judgeWrite('department')">
					</u-input>
				</u-form-item>
				<u-form-item label="申请日期" prop="applyDate" v-if="judgeShow('applyDate')">
					<cudt-date-time type="date" v-model="dataForm.applyDate" placeholder="请输入申请日期"
						:disabled="judgeWrite('applyDate')"></cudt-date-time>
				</u-form-item>
				<u-form-item label="领用仓库" prop="useStock" v-if="judgeShow('useStock')">
					<u-input v-model="dataForm.useStock" placeholder="请输入领用仓库" :disabled="judgeWrite('useStock')">
					</u-input>
				</u-form-item>
				<u-form-item label="用品分类" prop="classification" v-if="judgeShow('classification')">
					<u-input v-model="dataForm.classification" placeholder="请输入用品分类"
						:disabled="judgeWrite('classification')"></u-input>
				</u-form-item>
				<u-form-item label="用品名称" prop="articlesName" v-if="judgeShow('articlesName')">
					<u-input v-model="dataForm.articlesName" placeholder="请输入用品名称"
						:disabled="judgeWrite('articlesName')"></u-input>
				</u-form-item>
				<u-form-item label="用品数量" prop="articlesNum" v-if="judgeShow('articlesNum')">
					<u-input v-model="dataForm.articlesNum" placeholder="请输入用品数量" type="number"
						:disabled="judgeWrite('articlesNum')"></u-input>
				</u-form-item>
				<u-form-item label="用品编号" prop="articlesId" v-if="judgeShow('articlesId')">
					<u-input v-model="dataForm.articlesId" placeholder="请输入用品编号" type="number"
						:disabled="judgeWrite('articlesId')"></u-input>
				</u-form-item>
				<u-form-item label="申请原因" prop="applyReasons" v-if="judgeShow('applyReasons')">
					<u-input v-model="dataForm.applyReasons" placeholder="请输入申请原因" type="text"
						:disabled="judgeWrite('applyReasons')"></u-input>
				</u-form-item>
			</view>
		</u-form>
	</view>
</template>

<script>
	import comMixin from '../mixin'
	export default {
		name: 'OfficeSupplies',
		mixins: [comMixin],
		data() {
			return {
				billEnCode: 'WF_OfficeSuppliesNo',
				dataForm: {
					flowTitle: '',
					billNo: '',
					flowUrgent: 1,
					articlesNum: '',
					articlesName: '',
					applyUser: '',
					department: '',
					position: '',
					applyDate: '',
					classification: '',
					useStock: '',
					applyReasons: '',
					articlesId: ''
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

			}
		},
		methods: {
			selfInit(data) {
				this.dataForm.applyDate = new Date().getTime()
				this.dataForm.flowTitle = this.userInfo.userName + "的领用办公用品申请"
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
