<template>
	<view class="workFlow-v">
		<mescroll-body ref="mescrollRef" @down="downCallback" :sticky="true" :up="upOption" :bottombar="false">
			<view class="search-box_sticky">
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
			</view>
			<view class="workFlow-list">
				<view class="part">
					<view class="caption">全部应用</view>
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
		</mescroll-body>
	</view>
</template>

<script>
	import {
		getDictionaryDataAll
	} from '@/api/common.js'
	import {
		FlowEngineListAll
	} from '@/api/workFlow/flowEngine'
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import IndexMixin from './mixin.js'
	export default {
		mixins: [MescrollMixin, IndexMixin],
		data() {
			return {
				categoryList: [],
				flowEngineList: [],
				upOption: {
					use: false
				}
			}
		},
		methods: {
			downCallback() {
				FlowEngineListAll().then(res => {
					this.flowEngineList = res.data.list
					this.mescroll.endSuccess(res.data.list.length, false);
				}).catch(() => {
					this.mescroll.endErr();
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
