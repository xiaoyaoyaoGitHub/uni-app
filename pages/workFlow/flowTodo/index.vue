<template>
	<view>
		<view class="" v-if="list.length">
			<view class="" v-for="(item, index) in list" :key="item.id" @click="handleClick(item)">
				<view class="title-wrap">
					<text class="title u-line-2">{{ item.fullName }}</text>
				</view>
			</view>
		</view>
		<view class="noData" v-else>
			<u-empty text="暂无数据"></u-empty>
		</view>
	</view>
</template>

<script>
	import {
		FlowBeforeList
	} from '@/api/workFlow/flowBefore'
	export default {
		data() {
			return {
				list: [],
			}
		},
		onShow() {
			this.initData()
		},
		methods: {
			initData() {
				FlowBeforeList(1).then(res => {
					this.list = res.data.list
				})
			},
			handleClick(item) {
				const config = {
					id: item.processId,
					enCode: item.flowCode,
					flowId: item.flowId,
					formType: item.formType,
					opType: 1,
					status: item.status,
					taskNodeId: item.thisStepId,
					fullName: item.fullName,
					taskId: item.id
				}
				uni.navigateTo({
					url: '/pages/workFlow/flowBefore/index?config=' + encodeURIComponent(JSON.stringify(config))
				})
			}
		}
	}
</script>

<style>

</style>
