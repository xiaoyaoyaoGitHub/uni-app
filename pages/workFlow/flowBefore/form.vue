<template>
	<view>
		<template v-if="config.formType == 1">
			<applyBanquet ref="form" @eventReciver="eventReciver" v-if="config.enCode==='applyBanquet'" />
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
	import crmOrder from '@/pages/workFlow/workFlowForm/crmOrder'
	export default {
		components: {
			dynamicForm,
			applyBanquet,
			crmOrder
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
