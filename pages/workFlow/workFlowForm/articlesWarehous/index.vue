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
				<u-form-item label="所属部门" prop="department" v-if="judgeShow('department')">
					<u-input v-model="dataForm.department" placeholder="请输入所属部门" :disabled="judgeWrite('department')">
					</u-input>
				</u-form-item>
				<u-form-item label="申请日期" prop="applyDate" v-if="judgeShow('applyDate')">
					<jnpf-date-time type="date" v-model="dataForm.applyDate" placeholder="请输入申请日期"
						:disabled="judgeWrite('applyDate')"></jnpf-date-time>
				</u-form-item>
				<u-form-item label="用品库存" prop="articles" v-if="judgeShow('articles')">
					<u-input v-model="dataForm.articles" placeholder="请输入用品库存" :disabled="judgeWrite('articles')">
					</u-input>
				</u-form-item>
				<u-form-item label="用品分类" prop="classification" v-if="judgeShow('classification')">
					<u-input v-model="dataForm.classification" placeholder="请输入用品分类"
						:disabled="judgeWrite('classification')"></u-input>
				</u-form-item>
				<u-form-item label="用品编号" prop="articlesId" v-if="judgeShow('articlesId')">
					<u-input v-model="dataForm.articlesId" placeholder="请输入用品编号" :disabled="judgeWrite('articlesId')">
					</u-input>
				</u-form-item>
				<u-form-item label="单位" prop="company" v-if="judgeShow('company')">
					<u-input v-model="dataForm.company" placeholder="请输入单位" :disabled="judgeWrite('company')"></u-input>
				</u-form-item>
				<u-form-item label="数量" prop="estimatePeople" v-if="judgeShow('estimatePeople')">
					<u-input v-model="dataForm.estimatePeople" placeholder="请输入数量"
						:disabled="judgeWrite('estimatePeople')"></u-input>
				</u-form-item>
				<u-form-item label="申请原因" prop="applyReasons" v-if="judgeShow('applyReasons')">
					<u-input v-model="dataForm.applyReasons" placeholder="请输入申请原因"
						:disabled="judgeWrite('applyReasons')"></u-input>
				</u-form-item>
			</view>
		</u-form>
	</view>
</template>

<script>
	import comMixin from '../mixin'
	export default {
		name: 'articlesWarehous',
		mixins: [comMixin],
		data() {
			return {
				billEnCode: 'WF_articlesWarehousNo',
				dataForm: {
					flowTitle: '',
					billNo: '',
					flowUrgent: 1,
					applyUser: '',
					department: '',
					applyDate: '',
					estimatePeople: '',
					applyReasons: '',
					company: '',
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
						trigger: 'change',
					}]

				},
				borrowModeList: [{
						fullName: '查阅',
						id: '1',
						checked: false
					},
					{
						fullName: '复印',
						id: '2',
						checked: false
					},
					{
						fullName: '外借',
						id: '3',
						checked: false
					},
					{
						fullName: '其他',
						id: '4',
						checked: false
					}
				],
				attributeList: [{
						fullName: '原件',
						id: '1',
						checked: false
					},
					{
						fullName: '复印件',
						id: '2',
						checked: false
					},
					{
						fullName: '其他',
						id: '3',
						checked: false
					}
				]
			}
		},
		methods: {
			selfInit(data) {
				console.log(this.userInfo)
				this.dataForm.applyDate = new Date().getTime()
				this.dataForm.flowTitle = this.userInfo.userName + "的用品入库申请"
				this.dataForm.applyUser = this.userInfo.userName + '/' + this.userInfo.userAccount
				this.dataForm.department = this.userInfo.departmentName
				if (this.userInfo.positionIds && this.userInfo.positionIds.length) {
					let list = this.userInfo.positionIds.map(o => o.name)
					this.dataForm.position = list.join(',')
				}
			}
		}
	}
</script>

<style>

</style>
