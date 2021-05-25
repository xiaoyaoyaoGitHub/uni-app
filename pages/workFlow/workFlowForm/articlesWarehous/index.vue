<template>
	<view class="jnpf-wrap jnpf-wrap-workflow">
		<u-form :model="dataForm" :rules="rules" ref="dataForm" :errorType="['toast']" label-position="left"
			label-width="150" label-align="left">
			<u-form-item label="流程标题" prop="flowTitle" required>
				<u-input v-model="dataForm.flowTitle" placeholder="流程标题"></u-input>
			</u-form-item>
			<u-form-item label="流程编码" prop="billNo" v-if="judgeShow('billNo')" required>
				<u-input v-model="dataForm.billNo" placeholder="流程编码" disabled></u-input>
			</u-form-item>
			<u-form-item label="紧急程度" prop="flowUrgent" required>
				<jnpf-select v-model="dataForm.flowUrgent" placeholder="请选择紧急程度" :options="flowUrgentOptions">
				</jnpf-select>
			</u-form-item>
			
			<view class="jnpf-card">
				<u-form-item label="申请人员" prop="applyUser" v-if="judgeShow('applyUser')">
					<u-input v-model="dataForm.applyUser" placeholder="申请人员"></u-input>
				</u-form-item>
				<u-form-item label="所属部门" prop="department" v-if="judgeShow('department')">
					<jnpf-org-select type="department" v-model="dataForm.department" placeholder="所属部门"></jnpf-org-select>
				</u-form-item>
				<u-form-item label="申请日期" prop="applyDate" v-if="judgeShow('applyDate')">
					<jnpf-date-time type="date" v-model="dataForm.applyDate" placeholder="申请日期"></jnpf-date-time>
				</u-form-item>
				<u-form-item label="用品库存" prop="articles" v-if="judgeShow('articles')">
					<u-input v-model="dataForm.articles" placeholder="用品库存"></u-input>
				</u-form-item>
				<u-form-item label="用品分类" prop="classification" v-if="judgeShow('classification')">
					<u-input v-model="dataForm.classification" placeholder="用品分类"></u-input>
				</u-form-item>
				<u-form-item label="用品编号" prop="archivalAttributes" v-if="judgeShow('archivalAttributes')">
					<u-input v-model="dataForm.archivalAttributes" placeholder="用品编号"></u-input>
				</u-form-item>
				<u-form-item label="单位" prop="company" v-if="judgeShow('company')">
					<u-input v-model="dataForm.company" placeholder="单位"></u-input>
				</u-form-item>
				<u-form-item label="数量" prop="estimatePeople" v-if="judgeShow('estimatePeople')">
					<u-input v-model="dataForm.estimatePeople" placeholder="数量"></u-input>
				</u-form-item>
				<u-form-item label="申请原因" prop="applyReason" v-if="judgeShow('applyReason')">
					<u-input v-model="dataForm.applyReason" placeholder="申请原因"></u-input>
				</u-form-item>
			</view>
		</u-form>
	</view>
</template>

<script>
	import comMixin from '../mixin'
	export default {
		name: 'articlesWarehousNo',
		mixins: [comMixin],
		data() {
			return {
				billEnCode: 'WF_articlesWarehousNo',
				dataForm: {
					flowTitle: '',
					billNo:'',
					flowUrgent:'',
					applyUser:'',
					department:'',
					applyDate:'',
					estimatePeople:'',
					applyReason:'',
					company:''
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
				attributeList:[{
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
				this.dataForm.applyDate = new Date().getTime()
				this.dataForm.flowTitle = this.userInfo.userName + "的用品入库申请"
				this.dataForm.applyUser = this.userInfo.userName + '/' + this.userInfo.userAccount
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
