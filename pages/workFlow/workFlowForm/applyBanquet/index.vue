<template>
	<view class="jnpf-wrap jnpf-wrap-workflow">
		<u-form :model="dataForm" :rules="rules" ref="dataForm" :errorType="['toast']" label-position="left"
			label-width="150" label-align="left">
			<u-form-item label="流程标题" prop="flowTitle" required>
				<u-input v-model="dataForm.flowTitle" placeholder="流程标题"></u-input>
			</u-form-item>
			<u-form-item label="流程编码" prop="billNo" v-if="judgeShow('billNo')">
				<u-input v-model="dataForm.billNo" placeholder="流程编码" ></u-input>
			</u-form-item>
			<u-form-item label="紧急程度" prop="flowUrgent">
				<jnpf-select v-model="dataForm.flowUrgent" placeholder="请选择紧急程度" :options="flowUrgentOptions">
				</jnpf-select>
			</u-form-item>
			<u-form-item label="申请人员" prop="applyUser">
				<u-input v-model="dataForm.applyUser" placeholder="申请人员" ></u-input>
			</u-form-item>
			<u-form-item label="所属职务" prop="position">
				<u-input v-model="dataForm.position" placeholder="所属职务" ></u-input>
			</u-form-item>
			<u-form-item label="申请日期" prop="applyDate">
				<jnpf-date-time type="date" placeholder="申请日期" v-model="dataForm.applyDate" ></jnpf-date-time>
			</u-form-item>
			<view class="jnpf-card">
				<u-form-item label="宴请人数" prop="banquetNum">
					<u-input v-model="dataForm.banquetNum" type="number" placeholder="宴请人数"></u-input>
				</u-form-item>
				<u-form-item label="宴请人员" prop="banquetPeople">
					<u-input v-model="dataForm.banquetPeople" placeholder="宴请人员"></u-input>
				</u-form-item>
				<u-form-item label="人员总数" prop="total">
					<u-input v-model="dataForm.total" type="number" placeholder="人员总数"></u-input>
				</u-form-item>
				<u-form-item label="宴请地点" prop="place">
					<u-input v-model="dataForm.place" type="textarea" placeholder="宴请地点"></u-input>
				</u-form-item>
				<u-form-item label="预计费用" prop="expectedCost">
					<u-input v-model="dataForm.expectedCost" type="number" placeholder="预计费用"></u-input>
				</u-form-item>
				<u-form-item label="备注" prop="description">
					<u-input v-model="dataForm.description" type="textarea" placeholder="备注" />
				</u-form-item>
			</view>
		</u-form>
	</view>
</template>

<script>
	import comMixin from '../mixin'
	export default {
		name: 'ApplyBanquet',
		mixins: [comMixin],
		data() {
			return {
				billEnCode: 'WF_ApplyBanquetNo',
				dataForm: {
					flowId: '',
					id: '',
					billNo: '',
					flowTitle: '',
					flowUrgent: 1,
					applyUser: '',
					position: '',
					applyDate: '',
					banquetNum: '',
					banquetPeople: '',
					total: '',
					place: '',
					expectedCost: '',
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
					banquetNum: [{
						pattern: /^[1-9]\d*$/,
						message: '宴请人数请输入正整数'
					}],
					total: [{
						pattern: /^[1-9]\d*$/,
						message: '人员总数请输入正整数'
					}]
				},
			}
		},
		methods: {
			selfInit(data) {
				this.dataForm.applyDate = new Date().getTime()
				this.dataForm.flowTitle = this.userInfo.userName + "的宴请申请"
				this.dataForm.applyUser = this.userInfo.userName + '/' + this.userInfo.userAccount
				if (this.userInfo.positionIds && this.userInfo.positionIds.length) {
					let list = this.userInfo.positionIds.map(o => o.name)
					this.dataForm.position = list.join(',')
				}
			}
		}
	}
</script>
