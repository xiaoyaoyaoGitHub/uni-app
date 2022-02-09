<template>
	<view class="workFlow-v">
		<mescroll-body ref="mescrollRef" @down="downCallback" :sticky="true" :up="upOption" :bottombar="false">
			<view class="select-type">
				<view class="title">报表类型</view>
				<view class="types u-flex u-row-left">
					<span @click="() => {selectType(0)}" data-type=0 :class="{active: reportType === 0}">储备</span>
					<span @click="() => {selectType(1)}" data-type=1 :class="{active: reportType === 1}">在建</span>
					<span @click="() => {selectType(2)}" data-type=2 :class="{active: reportType === 2}">竣工</span>
				</view>
			</view>
			<view class="select-type">
				<view class="title">项目阶段</view>
				<view class="types u-flex u-row-left">
					<span @click="() => {selectStage(0)}"
						:class="{active: reportStageList.includes(0), disabled : reportType === 1 || reportType === 2}">储备</span>
					<span @click="() => {selectStage(1)}"
						:class="{active: reportStageList.includes(1),disabled: reportType === 0 || reportType === 2}">在建</span>
					<span @click="() => {selectStage(2)}"
						:class="{active: reportStageList.includes(2), disabled:reportType === 2}">储备转在建</span>
					<span @click="() => {selectStage(3)}"
						:class="{active: reportStageList.includes(3),disabled: reportType === 0}">竣工</span>
				</view>
			</view>
			<view class="select-type">
				<view class="title">审核状态</view>
				<view class="types u-flex u-row-left">
					<span @click="() => {selectStatus(0)}" :class="{active: reportStatusList.includes(0)}">未提交</span>
					<span @click="() => {selectStatus(1)}" :class="{active: reportStatusList.includes(1)}">待审核</span>
					<span @click="() => {selectStatus(2)}" :class="{active: reportStatusList.includes(2)}">审核通过</span>
					<span @click="() => {selectStatus(3)}" :class="{active: reportStatusList.includes(3)}">审核驳回</span>
				</view>
			</view>
			<view class="select-type">
				<view class="title">统计方式</view>
				<view class="types u-flex u-row-left">
					<span @click="() => {selectMode(0)}" data-type=0 :class="{active: reportMode === 0}">按区域</span>
					<span @click="() => {selectMode(1)}" data-type=1 :class="{active: reportMode === 1}">按行业</span>
					<span @click="() => {selectMode(2)}" data-type=2 :class="{active: reportMode === 2}">按子行业</span>
					<span @click="() => {selectMode(3)}" data-type=3 :class="{active: reportMode === 3}">按投资规模</span>
				</view>
				<view class="types amount-mode" v-if="reportMode === 3">
					<view class="u-flex u-row-left back-line ">
						<u-input class="amount" v-for="(item, index) in reportModeList" :key="index" :border="true"
							v-model="item.value" height="64" @change="change"></u-input>
						<!-- 	<u-input class="amount" :border="true" placeholder="100" height="64" @change="change"></u-input>
						<u-input class="amount" :border="true" placeholder="100" height="64" @change="change"></u-input>
						<u-input class="amount" :border="true" placeholder="100" height="64" @change="change"></u-input>
						<u-input class="amount" :border="true" placeholder="100" height="64" @change="change"></u-input>
						<u-input class="amount" :border="true" placeholder="100" height="64" @change="change"></u-input> -->
					</view>
					<view class="add" @click="addReportModeList">
						<view>
							<!-- <u-icon name="plus" size="48" color="#0060F4"></u-icon> -->
						</view>
					</view>
				</view>
			</view>

			<view class="btn">
				<u-button type="primary" @click="queryReport">
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
				},
				reportType: '', // 报表类型
				reportStageList: [], // 项目阶段
				reportStatusList: [], //审核状态
				reportMode: '', // 统计方式
				reportModeList: [{
					value: 10
				}, {
					value: 1000
				}, {
					value: 10000
				}, {
					value: 50000
				}]
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
			// 查询结果
			queryReport() {
				uni.navigateTo({
					url: '/pages/reportTable/buildReport/index'
				})
			},
			// 添加投资规模
			addReportModeList() {
				const currentReportList = [...this.reportModeList];
				currentReportList.push({
					value: 100000
				})
				this.reportModeList = currentReportList
			},
			// 选择项目阶段
			selectStage(stage) {
				if ((this.reportType === 0) && (stage === 1 || stage === 3)) return
				if (this.reportType === 1 && stage === 0) return
				if (this.reportType === 2 && (stage === 0 || stage === 1 || stage === 2)) return
				const currentReportStageList = [...this.reportStageList]
				if (currentReportStageList.includes(stage)) {
					this.reportStageList = currentReportStageList.filter(item => item !== stage)
				} else {
					this.reportStageList = [stage, ...currentReportStageList]
				}
			},
			// 选择审核状态
			selectStatus(status) {
				const currentReportStatusList = [...this.reportStatusList]
				if (currentReportStatusList.includes(status)) {
					this.reportStatusList = currentReportStatusList.filter(item => item !== status)
				} else {
					this.reportStatusList = [status, ...currentReportStatusList]
				}
			},
			// 选择报表类型
			selectType(type) {
				// console.log(e)
				const currentType = this.reportType;
				if (currentType !== type) {
					this.reportType = type;
					this.reportStageList = []
				}

			},
			selectMode(mode) {
				this.reportMode = mode
			},
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
						border-radius: 4rpx;
						-webkit-transform: scale(0.5, 0.5);
						transform: scale(0.5, 0.5);
						-webkit-transform-origin: top left;
					}

					&.disabled {
						color: rgba(7, 17, 39, .4);
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

			.amount-mode {
				position: relative;

				&>view {
					width: 100%;
					overflow-x: auto;

					.amount {
						position: relative;
						z-index: 1;
						margin-top: 52rpx;
						flex: 0 0 144rpx;
						margin-right: 21rpx;
						border-radius: 4rpx;
						background-color: #fff;
						box-shadow: 0rpx 0rpx 30rpx #fff;
						border-color: rgba(193, 195, 201, 0.75) !important;

					}
				}



				&:after {
					content: '';
					position: absolute;
					left: 0;
					right: 0;
					// top: 0;
					bottom: 32rpx;
					height: 0rpx;
					border-top: 1px solid #2C3548;
					margin: auto;
				}

				&>.add {
					position: absolute;
					z-index: 2;
					right: 0;
					bottom: 0;
					width: 79rpx;
					height: 68rpx;
					text-align: right;
					margin: 0 auto;
					background: #fff;
					box-shadow: -5rpx 0px 10rpx rgba(193, 195, 201, 1);

					&>view {
						position: absolute;
						width: 48rpx;
						height: 48rpx;
						border: 4rpx solid #0B66F4;
						top: 0;
						right: 0;
						bottom: 0;
						margin: auto;
						text-align: center;
						border-radius: 8rpx;

						&:after {
							content: '';
							position: absolute;
							display: block;
							width: 4rpx;
							height: 27rpx;
							background: #0B66F4;
							left: 0;
							right: 0;
							top: 0;
							bottom: 0;
							margin: auto;
						}

						&::before {
							content: '';
							position: absolute;
							display: block;
							height: 4rpx;
							width: 27rpx;
							background: #0B66F4;
							left: 0;
							right: 0;
							bottom: 0;
							top: 0;
							bottom: 0;
							margin: auto;
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
