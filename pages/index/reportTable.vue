<template>
	<view class="workFlow-v">
		<mescroll-body ref="mescrollRef" @down="downCallback" :sticky="true" :up="upOption" :bottombar="false">
			<view class="select-type">
				<view class="title">报表类型</view>
				<view class="types u-flex u-row-left">
					<span class="active">储备</span>
					<span>在建</span>
					<span>竣工</span>
				</view>
			</view>
			<view class="select-type">
				<view class="title">项目阶段</view>
				<view class="types u-flex u-row-left">
					<span class="active">储备</span>
					<span>在建</span>
					<span>储备转在建</span>
					<span>竣工</span>
				</view>
			</view>
			<view class="select-type">
				<view class="title">审核状态</view>
				<view class="types u-flex u-row-left">
					<span class="active">未提交</span>
					<span>待审核</span>
					<span>审核通过</span>
					<span>审核驳回</span>
				</view>
			</view>
			<view class="select-type">
				<view class="title">统计方式</view>
				<view class="types u-flex u-row-left">
					<span class="active">按区域</span>
					<span>按行业</span>
					<span>按子行业</span>
					<span>按投资规模</span>
				</view>
				<view class="types u-flex u-row-left back-line">
					<span>
						<input class="input-number" type="number" placeholder="100" />
					</span>
					<span>
						<input class="input-number" type="number" placeholder="1000" />
					</span>
					<span>
						<input class="input-number" type="number" placeholder="10000" />
					</span>
					<span>
						<input class="input-number" type="number" placeholder="100000" />
					</span>
				</view>
			</view>

			<view class="btn">
				<u-button type="primary">
					查询
				</u-button>
			</view>

			<!-- <view class="">
				<view class="search-box_sticky">
					<view class="tabs u-flex">
						<navigator url="/pages/reportTable/storeReport/index" hover-class="none"
							class="tabs-item u-flex-col u-col-center">
							<text class="icon-ym icon-ym-flowLaunch-app u-font-40 tabs-icon launch" />
							<text class="u-font-24">储备报表</text>
						</navigator>
						<navigator url="/pages/reportTable/buildReport/index" hover-class="none"
							class="tabs-item u-flex-col u-col-center">
							<text class="icon-ym icon-ym-flowTodo-app u-font-40 tabs-icon todo" />
							<text class="u-font-24">在建报表</text>
						</navigator>
						<navigator url="/pages/reportTable/liveReport/index" hover-class="none"
							class="tabs-item u-flex-col u-col-center">
							<text class="icon-ym icon-ym-flowDone-app u-font-40 tabs-icon done" />
							<text class="u-font-24">运营报表</text>
						</navigator>
						<navigator url="/pages/reportTable/projectMap/index" hover-class="none"
							class="tabs-item u-flex-col u-col-center">
							<text class="icon-ym icon-ym-flowCopy-app u-font-40 tabs-icon copy" />
							<text class="u-font-24">项目地图</text>
						</navigator>
					</view>
				</view>
				<view class="workFlow-list">
					<view class="part">
						<view class="caption">常用应用</view>
						<view class="u-flex u-flex-wrap">
							<view class="item u-flex-col u-col-center" v-for="(item,i) in usualList" :key="i"
								@click="handelClick(item)">
								<text class="u-font-40 item-icon" :class="item.icon"
									:style="{'background':item.iconBackground||'#008cff'}" />
								<text class="u-font-24 u-line-1 item-text">{{item.fullName}}</text>
							</view>
							<view class="item u-flex-col u-col-center" @click="moreApp">
								<text class="u-font-40 item-icon more">+</text>
								<text class="u-font-24 u-line-1 item-text">更多应用</text>
							</view>
						</view>
					</view>
					<view class="part" v-for="(item,i) in flowEngineList" :key="i">
						<view class="caption u-line-1">{{item.fullName}}</view>
						<view class="u-flex u-flex-wrap">
							<view class="item u-flex-col u-col-center" v-for="(child,ii) in item.children" :key="ii"
								@click="handelClick(child)">
								<text class="u-font-40 item-icon" :class="child.icon"
									:style="{'background':child.iconBackground||'#008cff'}" />
								<text class="u-font-24 u-line-1 item-text">{{child.fullName}}</text>
							</view>
						</view>
					</view>
				</view>

			</view>
 -->
		</mescroll-body>
	</view>
</template>

<script>
	import {
		FlowEngineListAll
	} from '@/api/workFlow/flowEngine'
	import {
		getUsualList
	} from '@/api/apply/apply.js'
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import IndexMixin from './mixin.js'
	export default {
		mixins: [MescrollMixin, IndexMixin],
		data() {
			return {
				usualList: [],
				flowEngineList: [],
				upOption: {
					use: false
				}
			}
		},
		onLoad() {
			uni.$on('updateUsualList', data => {
				this.getUsualList()
			})
		},
		onUnload() {
			uni.$off('updateUsualList')
		},
		methods: {
			getUsualList() {
				getUsualList(1).then(res => {
					this.usualList = res.data.list.map(o => {
						const objectData = o.objectData ? JSON.parse(o.objectData) : {}
						return {
							...o,
							...objectData
						}
					})
				})
			},
			downCallback() {
				this.getUsualList()
				FlowEngineListAll().then(res => {
					this.flowEngineList = res.data.list
					this.mescroll.endSuccess(res.data.list.length, false);
				}).catch(() => {
					this.mescroll.endErr();
				})
			},
			moreApp() {
				uni.navigateTo({
					url: '/pages/workFlow/allApp/index'
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

		.select-type {
			background-color: #fff;
			padding: 32rpx;
			margin-top: 20rpx;

			.title {
				line-height: 44rpx;
				color: #5E6573;
			}

			.types {
				&>span {
					flex: 0 0 144rpx;
					padding: 11rpx 20rpx;
					text-align: center;
					font-size: 28rpx;
					line-height: 42rpx;
					color: #071127;
					white-space: nowrap;
					// border: 1px solid rgba(193, 195,201, 0.25);
					margin: 20rpx 0 0 24rpx;
					position: relative;
					box-sizing: border-box;

					&>.input-number {
						height: 100%;
					}

					&:nth-of-type(1) {
						margin-left: 0;
					}

					&:after {
						content: '';
						width: 200%;
						height: 200%;
						position: absolute;
						top: 0;
						left: 0;
						border: 1px solid rgba(193, 195, 201, 0.75);
						border-radius: 4px;
						-webkit-transform: scale(0.5, 0.5);
						transform: scale(0.5, 0.5);
						-webkit-transform-origin: top left;
					}

					&.active {
						border: none;
						background: #F2F6FF;
						color: #0060F4;

						&:after {
							content: '';
							width: 200%;
							height: 200%;
							position: absolute;
							top: 0;
							left: 0;
							border: 1px solid transparent;
							border-radius: 4px;
							-webkit-transform: scale(0.5, 0.5);
							transform: scale(0.5, 0.5);
							-webkit-transform-origin: top left;
						}
					}
				}
			}
		}
		.btn {
			padding: 30rpx 32rpx 0;
		}

	}
</style>
