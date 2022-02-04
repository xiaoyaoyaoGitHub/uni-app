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
				<u-form-item label="申请日期" prop="applyDate" v-if="judgeShow('applyDate')">
					<cudt-date-time type="date" v-model="dataForm.applyDate" placeholder="请输入申请日期"
						:disabled="judgeWrite('applyDate')"></cudt-date-time>
				</u-form-item>
				<u-form-item label="所属部门" prop="departmental" v-if="judgeShow('departmental')">
					<u-input v-model="dataForm.departmental" placeholder="请输入所属部门"
						:disabled="judgeWrite('departmental')"></u-input>
				</u-form-item>
			</view>
			<view class="cudt-card">
				<u-form-item label="报销编号" prop="reimbursementId" v-if="judgeShow('reimbursementId')">
					<u-input v-model="dataForm.reimbursementId" placeholder="请输入报销编号"
						:disabled="judgeWrite('reimbursementId')"></u-input>
				</u-form-item>
				<u-form-item label="票据数" prop="billsNum" v-if="judgeShow('billsNum')">
					<u-input v-model="dataForm.billsNum" placeholder="请输入票据数" :disabled="judgeWrite('billsNum')">
					</u-input>
				</u-form-item>
				<u-form-item label="出差人员" prop="travelerUser" v-if="judgeShow('travelerUser')">
					<u-input v-model="dataForm.travelerUser" placeholder="请输入出差人员"
						:disabled="judgeWrite('travelerUser')"></u-input>
				</u-form-item>
				<u-form-item label="出差任务" prop="businessMission" v-if="judgeShow('businessMission')" required>
					<u-input v-model="dataForm.businessMission" placeholder="请输入出差任务" type="textarea"
						:disabled="judgeWrite('businessMission')"></u-input>
				</u-form-item>
			</view>
			<view class="cudt-card">
				<u-form-item label="出发日期" prop="setOutDate" v-if="judgeShow('setOutDate')" required>
					<cudt-date-time type="datetime" v-model="dataForm.setOutDate" placeholder="请选择出发日期"
						:disabled="judgeWrite('setOutDate')"></cudt-date-time>
				</u-form-item>
				<u-form-item label="回程日期" prop="returnDate" v-if="judgeShow('returnDate')" required>
					<cudt-date-time type="datetime" v-model="dataForm.returnDate" placeholder="请选择回程日期"
						:disabled="judgeWrite('returnDate')"></cudt-date-time>
				</u-form-item>
				<u-form-item label="目的地" prop="destination" v-if="judgeShow('destination')" required>
					<u-input v-model="dataForm.destination" placeholder="请输入目的地" :disabled="judgeWrite('destination')">
					</u-input>
				</u-form-item>
				<u-form-item label="车辆里程" prop="vehicleMileage" v-if="judgeShow('vehicleMileage')">
					<u-input v-model="dataForm.vehicleMileage" placeholder="请输入车辆里程"
						:disabled="judgeWrite('vehicleMileage')"></u-input>
				</u-form-item>
			</view>
			<view class="cudt-card">
				<u-form-item label="过路费" prop="roadFee" v-if="judgeShow('roadFee')">
					<u-input v-model="dataForm.roadFee" placeholder="请输入过路费" type="number"
						:disabled="judgeWrite('roadFee')"></u-input>
				</u-form-item>
				<u-form-item label="停车费" prop="parkingRate" v-if="judgeShow('parkingRate')">
					<u-input v-model="dataForm.parkingRate" placeholder="请输入停车费" type="number"
						:disabled="judgeWrite('parkingRate')"></u-input>
				</u-form-item>
				<u-form-item label="故障报修费" prop="breakdownFee" v-if="judgeShow('breakdownFee')">
					<u-input v-model="dataForm.breakdownFee" placeholder="请输入故障报修费" type="number"
						:disabled="judgeWrite('breakdownFee')"></u-input>
				</u-form-item>
				<u-form-item label="机票费" prop="planeTicket" v-if="judgeShow('planeTicket')">
					<u-input v-model="dataForm.planeTicket" placeholder="请输入机票费" type="number"
						:disabled="judgeWrite('planeTicket')"></u-input>
				</u-form-item>
				<u-form-item label="车船费" prop="fare" v-if="judgeShow('fare')">
					<u-input v-model="dataForm.fare" placeholder="请输入车船费" type="number" :disabled="judgeWrite('fare')">
					</u-input>
				</u-form-item>
				<u-form-item label="住宿费用" prop="getAccommodation" v-if="judgeShow('getAccommodation')">
					<u-input v-model="dataForm.getAccommodation" placeholder="请输入住宿费用" type="number"
						:disabled="judgeWrite('getAccommodation')"></u-input>
				</u-form-item>
				<u-form-item label="轨道交通费" prop="railTransit" v-if="judgeShow('railTransit')">
					<u-input v-model="dataForm.railTransit" placeholder="请输入轨道交通费" type="number"
						:disabled="judgeWrite('railTransit')"></u-input>
				</u-form-item>
				<u-form-item label="餐补费用" prop="mealAllowance" v-if="judgeShow('mealAllowance')">
					<u-input v-model="dataForm.mealAllowance" placeholder="请输入餐补费用" type="number"
						:disabled="judgeWrite('mealAllowance')"></u-input>
				</u-form-item>
				<u-form-item label="出差补助" prop="travelAllowance" v-if="judgeShow('travelAllowance')">
					<u-input v-model="dataForm.travelAllowance" placeholder="请输入出差补助" type="number"
						:disabled="judgeWrite('travelAllowance')"></u-input>
				</u-form-item>
			</view>
			<view class="cudt-card">
				<u-form-item label="其他费用" prop="other" v-if="judgeShow('other')">
					<u-input v-model="dataForm.other" placeholder="请输入其他费用" type="number"
						:disabled="judgeWrite('other')"></u-input>
				</u-form-item>
				<u-form-item label="总计费用" prop="total" v-if="judgeShow('total')">
					<u-input v-model="dataForm.total" placeholder="请输入总计费用" type="number"
						:disabled="judgeWrite('total')"></u-input>
				</u-form-item>
				<u-form-item label="报销金额" prop="reimbursementAmount" v-if="judgeShow('reimbursementAmount')">
					<u-input v-model="dataForm.reimbursementAmount" placeholder="请输入总计费用" type="number"
						:disabled="judgeWrite('reimbursementAmount')"></u-input>
				</u-form-item>
				<u-form-item label="借款金额" prop="loanAmount" v-if="judgeShow('loanAmount')">
					<u-input v-model="dataForm.loanAmount" placeholder="请输入借款金额" type="number"
						:disabled="judgeWrite('loanAmount')"></u-input>
				</u-form-item>
				<u-form-item label="补找金额" prop="sumOfMoney" v-if="judgeShow('sumOfMoney')">
					<u-input v-model="dataForm.sumOfMoney" placeholder="请输入补找金额" type="number"
						:disabled="judgeWrite('sumOfMoney')"></u-input>
				</u-form-item>
			</view>
		</u-form>
	</view>
</template>

<script>
	import comMixin from '../mixin'
	export default {
		name: 'TravelReimbursement',
		mixins: [comMixin],
		data() {
			return {
				billEnCode: 'WF_TravelReimbursementNo',
				dataForm: {
					flowTitle: '',
					billNo: '',
					flowUrgent: 1,
					applyUser: '',
					departmental: '',
					reimbursementId: '',
					travelerUser: '',
					applyDate: '',
					destination: '',
					breakdownFee: '',
					vehicleMileage: '',
					billsNum: '',
					roadFee: '',
					businessMission: '',
					setOutDate: '',
					returnDate: '',
					parkingRate: '',
					planeTicket: '',
					fare: '',
					getAccommodation: '',
					railTransit: '',
					mealAllowance: '',
					travelAllowance: '',
					other: '',
					total: '',
					reimbursementAmount: '',
					loanAmount: '',
					sumOfMoney: ''
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
					businessMission: [{
						required: true,
						message: '出差任务不能为空',
						trigger: 'change',
					}],
					setOutDate: [{
						required: true,
						message: '出发时间不能为空',
						trigger: 'change',
						type: 'number'
					}],
					returnDate: [{
						required: true,
						message: '出发时间不能为空',
						trigger: 'change',
						type: 'number'
					}],
					destination: [{
						required: true,
						message: '目的地不能为空',
						trigger: 'change',
					}],
				}
			}
		},
		methods: {
			selfInit(data) {
				this.dataForm.applyDate = new Date().getTime()
				this.dataForm.flowTitle = this.userInfo.userName + "的差旅报销申请"
				this.dataForm.applyUser = this.userInfo.userName + '/' + this.userInfo.userAccount;
				this.dataForm.departmental = this.userInfo.departmentName;
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
