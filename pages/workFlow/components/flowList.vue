<template>
	<view class="flow-list flowBefore">
		<view class="item" v-for="(item, index) in list" :key="item.id" @click="handleClick(item)">
			<view class="item-cell item-title u-border-bottom">
				<text class="title u-line-1">{{item.fullName}}</text>
			</view>
			<view class="item-cell">
				<text class="time">{{item.creatorTime | date('yyyy-mm-dd hh:MM')}}</text>
				<text :class="'status '+getFlowStatus(item.status).statusCss">
					{{getFlowStatus(item.status).text}}
				</text>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: "FlowList",
		props: {
			list: {
				type: Array,
				default: () => []
			},
			opType: {
				type: Number,
				default: 1
			}
		},
		data() {
			return {};
		},
		methods: {
			handleClick(item) {
				const config = {
					id: item.processId,
					enCode: item.flowCode,
					flowId: item.flowId,
					formType: item.formType,
					opType: this.opType,
					status: item.status,
					taskNodeId: item.thisStepId,
					fullName: item.fullName,
					taskId: item.id
				}
				uni.navigateTo({
					url: '/pages/workFlow/flowBefore/index?config=' + encodeURIComponent(JSON.stringify(config))
				})
			},
			getFlowStatus(val) {
				let status
				switch (val) {
					case 0:
						status = {
							text: '等待提交',
							statusCss: 'u-type-info'
						}
						break;
					case 1:
						status = {
							text: '等待审核',
							statusCss: 'u-type-primary'
						}
						break;
					case 2:
						status = {
							text: '审核通过',
							statusCss: 'u-type-success'
						}
						break;
					case 3:
						status = {
							text: '审核驳回',
							statusCss: 'u-type-error'
						}
						break;
					case 4:
						status = {
							text: '审核撤回',
							statusCss: 'u-type-error'
						}
						break;
					case 5:
						status = {
							text: '审核终止',
							statusCss: 'u-type-info'
						}
						break;
					default:
						status = {
							text: '等待提交',
							statusCss: 'u-type-info'
						}
						break;
				}
				return status
			}
		}
	};
</script>
