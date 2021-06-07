<template>
	<view class="workFlow-v">
		<u-sticky :enable="enable">
			<view class="tabs u-flex">
				<navigator url="/pages/workFlow/flowLaunch/index" class="tabs-item u-flex-col u-col-center">
					<text class="icon-ym icon-ym-flowLaunch-app u-font-40 tabs-icon launch" />
					<text class="u-font-24">我发起的</text>
				</navigator>
				<navigator url="/pages/workFlow/flowTodo/index" class="tabs-item u-flex-col u-col-center">
					<text class="icon-ym icon-ym-flowTodo-app u-font-40 tabs-icon todo" />
					<text class="u-font-24">待办事宜</text>
				</navigator>
				<navigator url="/pages/workFlow/flowDone/index" class="tabs-item u-flex-col u-col-center">
					<text class="icon-ym icon-ym-flowDone-app u-font-40 tabs-icon done" />
					<text class="u-font-24">已办事宜</text>
				</navigator>
				<navigator url="/pages/workFlow/flowCopy/index" class="tabs-item u-flex-col u-col-center">
					<text class="icon-ym icon-ym-flowCopy-app u-font-40 tabs-icon copy" />
					<text class="u-font-24">抄送我的</text>
				</navigator>
			</view>
		</u-sticky>
		<view class="workFlow-list">
			<view class="part u-padding-35">
				<!-- <view class="caption">全部应用</view> -->
				<navigator url="/pages/workFlow/allApplications/index" class="tabs-item">
					<text class="u-font-36">全部应用</text>
				</navigator>
			</view>
			
			<view class="part" v-for="(item,i) in flowEngineList" :key="i">
				<view class="caption">{{item.fullName}}</view>
				<view class="u-flex u-flex-wrap">
					<view class="item u-flex-col u-col-center" v-for="(child,ii) in item.children" :key="ii"
						@click="handelClick(child)">
						<text class="u-font-40 item-icon" :class="child.icon"
							:style="{'background':child.iconBackground|| '#008cff'}" />
						<text class="u-font-24 u-line-1 item-text">{{child.fullName}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getDictionaryDataAll
	} from '@/api/common.js'
	import {
		FlowEngineListAll
	} from '@/api/workFlow/flowEngine'
	export default {
		data() {
			return {
				enable: true,
				categoryList: [],
				flowEngineList: [],
			}
		},
		onLoad() {
			this.getDictionaryData()
		},
		onShow() {
			this.enable = true
		},
		onHide() {
			this.enable = false
		},
		onPullDownRefresh() {
			this.getDictionaryData()
		},
		methods: {
			getDictionaryData() {
				this.$store.dispatch('base/getDictionaryData', {
					sort: 'WorkFlowCategory'
				}).then(res => {
					this.categoryList = res
					this.getFlowEngineList()
				})
			},
			
			getFlowEngineList() {
				FlowEngineListAll().then(res => {
					const list = res.data.list
					this.flowEngineList = JSON.parse(JSON.stringify(this.categoryList))
					for (let i = 0; i < this.flowEngineList.length; i++) {
						let child = list.filter(o => this.flowEngineList[i].enCode === o.category)
						let count = child.length
						this.$set(this.flowEngineList[i], 'children', child)
						this.$set(this.flowEngineList[i], 'count', count)
					}
					this.flowEngineList = this.flowEngineList.filter(o => o.children.length);
					uni.stopPullDownRefresh();
				})
			},
			
			handelClick(item) {
				const config = {
					id: '',
					enCode: item.enCode,
					flowId: item.id,
					formType: item.formType,
					opType: '-1',
					taskNodeId: '',
					fullName: item.fullName
				}
				uni.navigateTo({
					url: '/pages/workFlow/flowBefore/index?config=' + encodeURIComponent(JSON.stringify(config))
				})
			},
			
			toForm() {
				const config = {
					id: '',
					enCode: 'crmOrder',
					flowId: '52d3144909d04e2f8a6629ab2ab39e14',
					formType: 1,
					opType: '-1',
					taskNodeId: '',
					fullName: '新增订单'
				}
				uni.navigateTo({
					url: '/pages/workFlow/flowBefore/index?config=' + encodeURIComponent(JSON.stringify(config))
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f0f2f6;
	}

	.workFlow-v {
		.tabs {
			height: 190rpx;
			background: #fff;
			padding: 0 16rpx;
			box-shadow: 0 2rpx 8rpx #e1e5ec;

			.tabs-item {
				width: 25%;

				.tabs-icon {
					width: 88rpx;
					height: 88rpx;
					margin-bottom: 8rpx;
					line-height: 88rpx;
					text-align: center;
					border-radius: 20rpx;
					background: #5094F3;
					color: #fff;

					&.launch {
						background: #5094F3;
					}

					&.todo {
						background: #B849C9;
					}

					&.done {
						background: #3FAC6B;
					}

					&.copy {
						background: #EE8331;
					}
				}
			}
		}

		.workFlow-list {
			padding: 20rpx 16rpx 0;

			.part {
				background: #fff;
				border-radius: 8rpx;
				margin-bottom: 20rpx;
				.caption {
					padding-left: 32rpx;
					font-size: 36rpx;
					line-height: 100rpx;
					font-weight: bold;
				}

				.item {
					margin-bottom: 32rpx;
					width: 25%;

					.item-icon {
						width: 88rpx;
						height: 88rpx;
						margin-bottom: 8rpx;
						line-height: 88rpx;
						text-align: center;
						border-radius: 20rpx;
						color: #fff;
					}

					.item-text {
						width: 100%;
						text-align: center;
						padding: 0 16rpx;
					}
				}
			}
		}
	}
</style>
