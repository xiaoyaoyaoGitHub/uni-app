<template>
	<view>
		<template v-if="config.formType == 1">
			<applyBanquet ref="form" @eventReciver="eventReciver" v-if="config.enCode==='applyBanquet'"/>
			<applyDeliverGoods ref="form" @eventReciver="eventReciver" v-if="config.enCode==='applyDeliverGoods'"/>
			<applyMeeting ref="form" @eventReciver="eventReciver" v-if="config.enCode==='applyMeeting'"/>
			<archivalBorrow ref="form" @eventReciver="eventReciver" v-if="config.enCode==='archivalBorrow'"/>
			<articlesWarehous ref="form" @eventReciver="eventReciver" v-if="config.enCode==='articlesWarehous'"/>
			<batchPack ref="form" @eventReciver="eventReciver" v-if="config.enCode==='batchPack'"/>
			<batchTable ref="form" @eventReciver="eventReciver" v-if="config.enCode==='batchTable'"/>
			<conBilling ref="form" @eventReciver="eventReciver" v-if="config.enCode==='conBilling'"/>
			<contractApproval ref="form" @eventReciver="eventReciver" v-if="config.enCode==='contractApproval'"/>
			<contractApprovalSheet ref="form" @eventReciver="eventReciver" v-if="config.enCode==='contractApprovalSheet'"/>
			<payDistribution ref="form" @eventReciver="eventReciver" v-if="config.enCode==='payDistribution'"/>
			<crmOrder ref="form" @eventReciver="eventReciver" v-if="config.enCode==='crmOrder'" />
			<debitBill ref="form" @eventReciver="eventReciver" v-if="config.enCode==='debitBill'" />
			<documentApproval ref="form" @eventReciver="eventReciver" v-if="config.enCode==='documentApproval'" />
			<documentSigning ref="form" @eventReciver="eventReciver" v-if="config.enCode==='documentSigning'" />
			<expenseExpenditure ref="form" @eventReciver="eventReciver" v-if="config.enCode==='expenseExpenditure'" />
			<finishedProduct ref="form" @eventReciver="eventReciver" v-if="config.enCode==='finishedProduct'" />
			<incomeRecognition ref="form" @eventReciver="eventReciver" v-if="config.enCode==='incomeRecognition'" />
			<leaveApply ref="form" @eventReciver="eventReciver" v-if="config.enCode==='leaveApply'"/>
			<letterService ref="form" @eventReciver="eventReciver" v-if="config.enCode==='letterService'"/>
			<materialRequisition ref="form" @eventReciver="eventReciver" v-if="config.enCode==='materialRequisition'"/>
			<monthlyReport ref="form" @eventReciver="eventReciver" v-if="config.enCode==='monthlyReport'"/>
			<officeSupplies ref="form" @eventReciver="eventReciver" v-if="config.enCode==='officeSupplies'"/>
			<outboundOrder ref="form" @eventReciver="eventReciver" v-if="config.enCode==='outboundOrder'"/>
			<outgoingApply ref="form" @eventReciver="eventReciver" v-if="config.enCode==='outgoingApply'"/>
			<paymentApply ref="form" @eventReciver="eventReciver" v-if="config.enCode==='paymentApply'"/>
			<postBatchTab ref="form" @eventReciver="eventReciver" v-if="config.enCode==='postBatchTab'"/>
			<procurementMaterial ref="form" @eventReciver="eventReciver" v-if="config.enCode==='procurementMaterial'"/>
			<purchaseList ref="form" @eventReciver="eventReciver" v-if="config.enCode==='purchaseList'"/>
			<quotationApproval ref="form" @eventReciver="eventReciver" v-if="config.enCode==='quotationApproval'"/>
			<receiptProcessing ref="form" @eventReciver="eventReciver" v-if="config.enCode==='receiptProcessing'"/>
			<receiptSign ref="form" @eventReciver="eventReciver" v-if="config.enCode==='receiptSign'"/>
			<rewardPunishment ref="form" @eventReciver="eventReciver" v-if="config.enCode==='rewardPunishment'"/>
			<salesOrder ref="form" @eventReciver="eventReciver" v-if="config.enCode==='salesOrder'"/>
			<salesSupport ref="form" @eventReciver="eventReciver" v-if="config.enCode==='salesSupport'"/>
			<staffOvertime ref="form" @eventReciver="eventReciver" v-if="config.enCode==='staffOvertime'"/>
			<supplementCard ref="form" @eventReciver="eventReciver" v-if="config.enCode==='supplementCard'"/>
			<travelApply ref="form" @eventReciver="eventReciver" v-if="config.enCode==='travelApply'"/>
			<travelReimbursement ref="form" @eventReciver="eventReciver" v-if="config.enCode==='travelReimbursement'"/>
			<vehicleApply ref="form" @eventReciver="eventReciver" v-if="config.enCode==='vehicleApply'"/>
			<violationHandling ref="form" @eventReciver="eventReciver" v-if="config.enCode==='violationHandling'"/>
			<warehouseReceipt ref="form" @eventReciver="eventReciver" v-if="config.enCode==='warehouseReceipt'"/>
			<workContactSheet ref="form" @eventReciver="eventReciver" v-if="config.enCode==='workContactSheet'"/>
		</template>
		<template v-else>
			<dynamicForm ref="form" @eventReciver="eventReciver" />
		</template>
	</view>
</template>

<script>
	import dynamicForm from '@/pages/workFlow/workFlowForm/dynamicForm'
	import applyBanquet from '@/pages/workFlow/workFlowForm/applyBanquet'
	import applyDeliverGoods from '@/pages/workFlow/workFlowForm/applyDeliverGoods'
	import applyMeeting from '@/pages/workFlow/workFlowForm/applyMeeting'
	import archivalBorrow from '@/pages/workFlow/workFlowForm/archivalBorrow'
	import articlesWarehous from '@/pages/workFlow/workFlowForm/articlesWarehous'
	import batchPack from '@/pages/workFlow/workFlowForm/batchPack'
	import batchTable from '@/pages/workFlow/workFlowForm/batchTable'
	import conBilling from '@/pages/workFlow/workFlowForm/conBilling'
	import contractApproval from '@/pages/workFlow/workFlowForm/contractApproval'
	import contractApprovalSheet from '@/pages/workFlow/workFlowForm/contractApprovalSheet'
	import payDistribution from '@/pages/workFlow/workFlowForm/payDistribution'
	import crmOrder from '@/pages/workFlow/workFlowForm/crmOrder'
	import debitBill from '@/pages/workFlow/workFlowForm/debitBill'
	import documentApproval from '@/pages/workFlow/workFlowForm/documentApproval'
	import documentSigning from '@/pages/workFlow/workFlowForm/documentSigning'
	import expenseExpenditure from '@/pages/workFlow/workFlowForm/expenseExpenditure'
	import finishedProduct from '@/pages/workFlow/workFlowForm/finishedProduct'
	import incomeRecognition from '@/pages/workFlow/workFlowForm/incomeRecognition'
	import leaveApply from '@/pages/workFlow/workFlowForm/leaveApply'
	import letterService from '@/pages/workFlow/workFlowForm/letterService'
	import materialRequisition from '@/pages/workFlow/workFlowForm/materialRequisition'
	import monthlyReport from '@/pages/workFlow/workFlowForm/monthlyReport'
	import officeSupplies from '@/pages/workFlow/workFlowForm/officeSupplies'
	import outboundOrder from '@/pages/workFlow/workFlowForm/outboundOrder'
	import outgoingApply from '@/pages/workFlow/workFlowForm/outgoingApply'
	import paymentApply from '@/pages/workFlow/workFlowForm/paymentApply'
	import postBatchTab from '@/pages/workFlow/workFlowForm/postBatchTab'
	import procurementMaterial from '@/pages/workFlow/workFlowForm/procurementMaterial'
	import purchaseList from '@/pages/workFlow/workFlowForm/purchaseList'
	import quotationApproval from '@/pages/workFlow/workFlowForm/quotationApproval'
	import receiptProcessing from '@/pages/workFlow/workFlowForm/receiptProcessing'
	import receiptSign from '@/pages/workFlow/workFlowForm/receiptSign'
	import rewardPunishment from '@/pages/workFlow/workFlowForm/rewardPunishment'
	import salesOrder from '@/pages/workFlow/workFlowForm/salesOrder'
	import salesSupport from '@/pages/workFlow/workFlowForm/salesSupport'
	import staffOvertime from '@/pages/workFlow/workFlowForm/staffOvertime'
	import supplementCard from '@/pages/workFlow/workFlowForm/supplementCard'
	import travelApply from '@/pages/workFlow/workFlowForm/travelApply'
	import travelReimbursement from '@/pages/workFlow/workFlowForm/travelReimbursement'
	import vehicleApply from '@/pages/workFlow/workFlowForm/vehicleApply'
	import violationHandling from '@/pages/workFlow/workFlowForm/violationHandling'
	import warehouseReceipt from '@/pages/workFlow/workFlowForm/warehouseReceipt'
	import workContactSheet from '@/pages/workFlow/workFlowForm/workContactSheet'
	export default {
		components: {
			crmOrder,
			dynamicForm,
			applyBanquet,
			applyDeliverGoods,
			applyMeeting,
			payDistribution,
			archivalBorrow,
			articlesWarehous,
			batchPack,
			batchTable,
			conBilling,
			contractApproval,
			contractApprovalSheet,
			debitBill,
			documentApproval,
			documentSigning,
			expenseExpenditure,
			finishedProduct,
			incomeRecognition,
			leaveApply,
			letterService,
			materialRequisition,
			monthlyReport,
			officeSupplies,
			outboundOrder,
			outgoingApply,
			paymentApply,
			postBatchTab,
			procurementMaterial,
			purchaseList,
			quotationApproval,
			receiptProcessing,
			receiptSign,
			rewardPunishment,
			salesOrder,
			salesSupport,
			staffOvertime,
			supplementCard,
			travelApply,
			travelReimbursement,
			vehicleApply,
			violationHandling,
			warehouseReceipt,
			workContactSheet
		},
		props: {
			config: {
				type: Object,
				default: () => {}
			},
		},
		methods: {
			eventReciver(formData, eventType) {
				this.$emit('eventReciver', formData, eventType)
			}
		}
	}
</script>
