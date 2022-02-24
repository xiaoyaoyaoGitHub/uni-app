<template>
	<view class="projects-v">
		<mescroll-body ref="mescrollRef" @down="downCallback" :sticky="true" :up="upOption" :bottombar="false">
			<view class="banner">
				<view class="banner-item project-amount">
					<view class="u-font-28">
						项目总数量
					</view>
					<view class="banner-volume u-font-40">
						{{allData.investTotal}}<span class="u-font-28">个</span>
					</view>
				</view>
				<view class="banner-item project-amount">
					<view class="u-font-28">
						在建项目总数量
					</view>
					<view class="banner-volume u-font-40">
						{{allData.cumulativeCompletion}}<span class="u-font-28">个</span>
					</view>
				</view>
				<view class="banner-item plan-amount">
					<view class="u-font-28">
						项目总投资
					</view>
					<view class="banner-volume u-font-36">
						{{allData.investTotal}}<span class="u-font-28">万元</span>
					</view>
				</view>
				<view class="banner-item plan-amount">
					<view class="u-font-28">
						在建项目总投资
					</view>
					<view class="banner-volume u-font-36">
						{{onGoingInfo.investTotal}}<span class="u-font-28">万元</span>
					</view>
				</view>
				<view class="banner-item year-plan">
					<view class="u-font-28">
						本年度计划投资
					</view>
					<view class="banner-volume u-font-36">
						{{allData.sumTotal}}<span class="u-font-28">万元</span>
					</view>
				</view>
				<view class="banner-item year-plan">
					<view class="u-font-28">
						本年度累计投资
					</view>
					<view class="banner-volume u-font-36">
						{{allData.investCurrentYear}}<span class="u-font-28">万元</span>
					</view>
				</view>
			</view>

			<view class="chart">
				<!-- :class="{scale: chartDone}" -->
				<view class="content" :class="{scale: chartDone}">
					<qiun-data-charts @complete="chartComplete" class="chartInfo" type="column" :echartsApp="true"
						:opts="eopts" :eopts="eopts" :chartData="charts" />
				</view>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import IndexMixin from './mixin.js'
	import {
		mapGetters
	} from "vuex"
	import {
		getQueryDataHomePageDetailList
	} from "@/api/projectReport.js"
	import {
		getModelListViaCode
	} from '@/api/apply/visualDev'
	import {
		moduleCodes,
		formatNumber,
		getCurrentUser
	} from '@/api/common'
	export default {
		mixins: [MescrollMixin, IndexMixin],
		data() {
			return {
				keyword: '',
				list: [],
				upOption: {
					use: false
				},
				chartDone: false,
				eopts: {
					legend: {
						position: 'top'
					},
					xAxis: {
						label: {
							rotate: 40
						},
						scrollShow: true
					},
					dataLabel: false,
					// enableScroll:true,

					colors: [
						"#ff9f7f",
						"#fb7293",
						"#e7bcf3",
						"#8378ea",
						"#37a2da",
						"#32c5e9",
						"#9fe6b8",
						"#ffdb5c",
						"#9bd317",

					],
					seriesTemplate: {
						name: '',
						type: 'bar',
						data: [],
						barwidth: 20,
						label: {
							show: false,
							color: "#fff",
							position: 'top',
						},
						textOffset: 30
					},

				},
				actionList: [],
				userInfo: {},
				totalPlan: '',
				totalActual: '',
				yearPlan: '',
				dicList: [],
				allData: {},
				onGoingInfo:{},
				charts: {

				}
			}
		},
		onLoad() {
			this.userInfo = uni.getStorageSync('userInfo') || {}
			this.dicList = uni.getStorageSync('dictionaryList') || []
			uni.$on('updateList', data => {})
			// this.loadProjects()
			this.loadCharts()
		},
		onUnload() {
			uni.$off('updateList')
		},
		methods: {
			chartComplete(e) {
				// console.log(e)
				this.chartDone = true
			},
			loadCharts() {
				getQueryDataHomePageDetailList({
					userInfo: this.userInfo
				}).then(res => {
					const {
						code,
						data: {
							regionResultList: originList = [],
							allData = {},
							onGoingInfo = {}
						} = {}
					} = res || {}
					if (code === 200) {
						this.allData = allData;
						this.onGoingInfo = onGoingInfo
						const regionResultList = originList.concat();
						console.log(originList)
						const baseLine = regionResultList[0]?.splice(1);
						const baseData = regionResultList.splice(1)
						const series = [];
						const categories = [];
						const a1 = [],
							a2 = [],
							a3 = [],
							a4 = [],
							a5 = [];
						baseData.forEach((item, index) => {
							categories.push(item[0]);
							a1.push(item[1])
							a2.push(item[2])
							a3.push(item[3])
							a4.push(item[4])
							a5.push(item[5])
						})
						baseLine.forEach((item, index) => {
							console.log('a' + index);
							const baseName = 'a' + (index - 0 + 1)
							const singleSeries = {
								name: item,
								label: {
									show: false
								},
								data: eval(baseName)
							}
							series.push(singleSeries)
						})
						this.allData.sumTotal = a2.reduce((all, next) => {
							console.log(all)
							return all + next
						},0)
						console.log(series)
						this.charts = {
							categories,
							series,
							legend: {
								show: false
							},
							yAxis: {
								gridType: 'dash',
								gridColor: '#CCCCCC',
								dashLength: 8,
								splitNumber: 5,
								min: 10,
								max: 180,
								format: (val) => {
									return val.toFixed(0) + '元'
								}
							},
						}
					}
				}).catch(err => {
					console.log(err)
				})
			},
			loadProjects() {
				const query = {
					currentPage: 1,
					pageSize: 10
				}
				getModelListViaCode(moduleCodes.AppProjectList, query).then(res => {
					this.list = []
					this.actionList = []
					this.dicList;
					//储备，在建，运营
					let count = [0, 0, 0]
					let invest = [0, 0, 0]
					for (let item of res.data.list) {
						if (item.pj_base_project_phase === '储备') {
							count[0]++
						} else if (item.pj_base_project_phase === '在建') {
							count[1]++
						} else if (item.pj_base_project_phase === '运营') {
							count[2]++
						}
						if (item.pj_fund_invest_total) {
							invest[0] += parseFloat(item.pj_fund_invest_total)
						}
						if (item.pj_fund_invest_actual) {
							invest[1] += parseFloat(item.pj_fund_invest_actual)
						}
						if (item.pj_fund_invest_currentyear) {
							invest[2] += parseFloat(item.pj_fund_invest_currentyear)
						}
						if (item.concerns && item.concerns.includes(this.userInfo.userAccount + ',')) {
							this.list.push(item)
						}
					}
					this.totalPlan = formatNumber(invest[0])
					this.totalActual = formatNumber(invest[1])
					this.yearPlan = formatNumber(invest[2])
					let storeAction = {
						name: "储备项目",
						icon: "bag",
						count: count[0],
						code: moduleCodes.StorePhaseProject
					}
					this.actionList.push(storeAction)
					let buildingAction = {
						name: "在建项目",
						icon: "play-circle",
						count: count[1],
						code: moduleCodes.BuildingPhaseProject
					}
					this.actionList.push(buildingAction)
					let operaAction = {
						name: "运营项目",
						icon: "rmb-circle",
						count: count[2],
						code: moduleCodes.OperationPhaseProject
					}
					this.actionList.push(operaAction)
				}).catch(err => {})
			},
			toDetail(item) {
				const path = "/pages/project/list/index?phase=" + item.code
				uni.navigateTo({
					url: path
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	page {
		background-color: #f0f2f6;
		// padding: 0 24rpx;

		.projects-v {
			padding: 0 24rpx;

			.banner {
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex-wrap: wrap;

				.banner-item {
					flex: 0 0 339rpx;
					padding: 20rpx 24rpx 22rpx;
					background-color: #fff;
					margin-top: 24rpx;

					&.project-amount {
						color: #023659;
						background: url(../../static/char_icon1.png) no-repeat center;
						background-size: cover;
					}

					&.plan-amount {
						color: #DC6800;
						background: url(../../static/char_icon2.png) no-repeat center;
						background-size: cover;
					}

					&.year-plan {
						color: #001A4B;
						background: url(../../static/char_icon3.png) no-repeat center;
						background-size: cover;
					}

					&>view {
						line-height: 40rpx;
						// color: #023659;

						&.banner-volume {
							// color: #023659;
							// font-size: 32rpx;
							margin-top: 18rpx;
							line-height: 50rpx;
							font-weight: bolder;

							&>span {
								font-weight: normal;
								margin-left: 8rpx;
							}
						}
					}
				}
			}

			.chart {
				background: #fff;
				height: 525rpx;
				margin-top: 24rpx;
				position: relative;
				overflow: auto;

				&>.content {
					width: 250%;
					// height: 100%;
					// position: relative;

					// &:after {
					// 	content: '';
					// 	position: absolute;
					// 	left: 0;
					// 	top: 0;
					// 	right: 0;
					// 	bottom: 0;
					// 	background: #fff;
					// 	z-index: 1;
					// }

					&.scale {
						// transform-origin: 0 0;
						// transformX: scale(0.8);
						// display: block;

						// &:after {
						// 	background: transparent
						// }
					}

					.chartInfo {}
				}
			}

			.grid-text {
				font-size: 16rpx;
				margin-top: 6rpx;
				color: $u-type-info;
			}

			.u-icon {
				color: blue;
			}

			.projects-v {
				.search-box_sticky {
					margin-bottom: 20rpx;
				}
			}
		}



	}
</style>
