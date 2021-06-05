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
				<u-form-item label="产品名称" prop="productName" v-if="judgeShow('productName')">
					<u-input v-model="dataForm.productName" placeholder="请输入产品名称" :disabled="judgeWrite('productName')">
					</u-input>
				</u-form-item>
				<u-form-item label="生产车间" prop="production" v-if="judgeShow('production')">
					<u-input v-model="dataForm.production" placeholder="请输入生产车间" :disabled="judgeWrite('production')">
					</u-input>
				</u-form-item>
				<u-form-item label="编制人员" prop="compactor" v-if="judgeShow('compactor')">
					<u-input v-model="dataForm.compactor" placeholder="请输入编制人员" :disabled="judgeWrite('compactor')">
					</u-input>
				</u-form-item>
				<u-form-item label="编制日期" prop="compactorDate" v-if="judgeShow('compactorDate')" required>
					<jnpf-date-time type="date" v-model="dataForm.compactorDate" placeholder="请输入编制日期"
						:disabled="judgeWrite('compactorDate')"></jnpf-date-time>
				</u-form-item>
				<u-form-item label="产品规格" prop="standard" v-if="judgeShow('standard')">
					<u-input v-model="dataForm.standard" placeholder="请输入产品规格" :disabled="judgeWrite('standard')">
					</u-input>
				</u-form-item>
				<u-form-item label="入库序号" prop="warehousNo" v-if="judgeShow('warehousNo')">
					<u-input v-model="dataForm.warehousNo" placeholder="请输入入库序号" :disabled="judgeWrite('warehousNo')">
					</u-input>
				</u-form-item>
				<u-form-item label="批产数量" prop="productionQuty" v-if="judgeShow('productionQuty')">
					<u-input v-model="dataForm.productionQuty" placeholder="请输入批产数量"
						:disabled="judgeWrite('productionQuty')"></u-input>
				</u-form-item>
				<u-form-item label="操作日期" prop="operationDate" v-if="judgeShow('operationDate')">
					<jnpf-date-time type="date" v-model="dataForm.operationDate" placeholder="请输入操作日期"
						:disabled="judgeWrite('operationDate')"></jnpf-date-time>
				</u-form-item>
				<u-form-item label="工艺规程" prop="regulations" v-if="judgeShow('regulations')">
					<u-input v-model="dataForm.regulations" placeholder="请输入工艺规程" :disabled="judgeWrite('regulations')">
					</u-input>
				</u-form-item>
				<u-form-item label="包装规格" prop="packing" v-if="judgeShow('packing')">
					<u-input v-model="dataForm.packing" placeholder="请输入包装规格" :disabled="judgeWrite('packing')">
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
		name: 'BatchPack',
		mixins: [comMixin],
		data() {
			return {
				billEnCode: 'WF_BatchPackNo',
				dataForm: {
					flowTitle: '',
					billNo: '',
					flowUrgent: 1,
					compactorDate: '',
					operationDate: '',
					productName: '',
					productionQuty: '',
					production: '',
					compactor: '',
					standard: '',
					warehousNo: '',
					regulations: '',
					packing: '',
					description: ''
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
					compactorDate: [{
						required: true,
						message: '编制日期不能为空',
						trigger: 'change',
						type: 'number'
					}]
				}
			}
		},
		methods: {
			selfInit(data) {
				this.dataForm.flowTitle = this.userInfo.userName + "的批包装指令"
			}
		}
	}
</script>

<style>

</style>
