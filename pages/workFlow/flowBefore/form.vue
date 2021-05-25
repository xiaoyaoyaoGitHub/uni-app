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
			contractApprovalSheet
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
