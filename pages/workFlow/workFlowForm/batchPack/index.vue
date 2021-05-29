<template>
	<view class="jnpf-wrap jnpf-wrap-workflow">
		<u-form :model="dataForm" :rules="rules" ref="dataForm" :errorType="['toast']" label-position="left"
			label-width="150" label-align="left">
			<u-form-item label="流程标题" prop="flowTitle" required>
				<u-input v-model="dataForm.flowTitle" placeholder="流程标题"></u-input>
			</u-form-item>
			<u-form-item label="流程编码" prop="billNo" v-if="judgeShow('billNo')" required>
				<u-input v-model="dataForm.billNo" placeholder="流程编码" ></u-input>
			</u-form-item>
			<u-form-item label="紧急程度" prop="flowUrgent" required>
				<jnpf-select v-model="dataForm.flowUrgent" placeholder="请选择紧急程度" :options="flowUrgentOptions">
				</jnpf-select>
			</u-form-item>
			
			<view class="jnpf-card">
				<u-form-item label="产品名称" prop="productName" v-if="judgeShow('productName')">
					<u-input v-model="dataForm.productName" placeholder="请输入产品名称"></u-input>
				</u-form-item>
				<u-form-item label="生产车间" prop="production" v-if="judgeShow('production')">
					<u-input v-model="dataForm.production" placeholder="请输入生产车间"></u-input>
				</u-form-item>
				<u-form-item label="编制人员" prop="compactor" v-if="judgeShow('compactor')">
					<u-input v-model="dataForm.compactor" placeholder="请输入编制人员"></u-input>
				</u-form-item>
				<u-form-item label="编制日期" prop="compactorDate" v-if="judgeShow('compactorDate')" required>
					<jnpf-date-time type="date" v-model="dataForm.compactorDate" placeholder="编制日期"></jnpf-date-time>
				</u-form-item>
				<u-form-item label="产品规格" prop="standard" v-if="judgeShow('standard')">
					<u-input v-model="dataForm.standard" placeholder="请输入产品规格"></u-input>
				</u-form-item>
				<u-form-item label="入库序号" prop="warehousNo" v-if="judgeShow('warehousNo')">
					<u-input v-model="dataForm.warehousNo" placeholder="请输入入库序号"></u-input>
				</u-form-item>
				<u-form-item label="批产数量" prop="productionQuty" v-if="judgeShow('productionQuty')">
					<u-input v-model="dataForm.productionQuty" placeholder="请输入批产数量"></u-input>
				</u-form-item>
				<u-form-item label="单位" prop="company" v-if="judgeShow('company')">
					<u-input v-model="dataForm.company" placeholder="单位"></u-input>
				</u-form-item>
				<u-form-item label="批产数量" prop="productionQuty" v-if="judgeShow('productionQuty')">
					<u-input v-model="dataForm.productionQuty" placeholder="请输入批产数量"></u-input>
				</u-form-item>
				<u-form-item label="操作日期" prop="operationDate" v-if="judgeShow('operationDate')">
					<jnpf-date-time type="date" v-model="dataForm.operationDate" placeholder="操作日期"></jnpf-date-time>
				</u-form-item>
				<u-form-item label="工艺规程" prop="regulations" v-if="judgeShow('regulations')">
					<u-input v-model="dataForm.regulations" placeholder="请输入工艺规程"></u-input>
				</u-form-item>
				<u-form-item label="包装规格" prop="packing" v-if="judgeShow('packing')">
					<u-input v-model="dataForm.packing" placeholder="请输入包装规格"></u-input>
				</u-form-item>
				<u-form-item label="备注" prop="description" v-if="judgeShow('description')">
					<u-input v-model="dataForm.description" placeholder="请输入备注" type="textarea"></u-input>
				</u-form-item>
				
			</view>
		</u-form>
	</view>
</template>

<script>
	import comMixin from '../mixin'
	export default {
		name: 'BatchPackNo',
		mixins: [comMixin],
		data() {
			return {
				billEnCode: 'WF_BatchPackNo',
				dataForm: {
					flowTitle: '',
					billNo:'',
					flowUrgent:1,
					compactorDate:'',
					operationDate:'',
					productName:'',
					productionQuty:'',
					production:'',
					compactor:'',
					standard:'',
					warehousNo:'',
					company:'',
					regulations:'',
					packing:'',
					description:''
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
					compactorDate:[{
						required: true,
						message: '编制日期不能为空',
						trigger: 'change',
						type:'number'
					}]
				}
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
