<template>
	<view class="index-v">
		<mescroll-body ref="mescrollRef" @down="downCallback" @up="loadProjectLataestProgress" :sticky="true"
			:up="upOption" :bottombar="false" bottom="100">
			<view class="banner">
				<u-swiper indicator-pos="bottomRight" mode="dot" :list="bannerList" height="280" :title="true"
					:title-style="{'font-size':'20px'}"></u-swiper>
			</view>
			<view class="project-lists">
				<u-row justify="space-between" gutter="0">
					<u-col span="4">
						<view @click.prevent="goToProjectLists" data-code="StorePhaseProject"
							class="project-lists-item unStart_project u-flex u-col-bottom u-row-center u-flex-col u-p-r-20">
							<view class="first-title u-font-28 u-text-right">
								储备项目
							</view>
							<view class="second-title u-font-40">
								{{projectInfo.liveInfo}}
							</view>
						</view>
					</u-col>
					<u-col span="4">
						<view @click="goToProjectLists" data-code="BuildingPhaseProject"
							class="project-lists-item doing_project u-flex u-col-bottom u-row-center u-flex-col u-p-r-20">
							<view class="first-title u-text-right u-font-28 ">
								在建项目
							</view>
							<view class="second-title u-text-right u-font-40">
								{{projectInfo.onGoingInfo}}
							</view>
						</view>
					</u-col>
					<u-col span="4">
						<view @click="goToProjectLists" data-code="OperationPhaseProject"
							class="project-lists-item finish_project u-flex u-col-bottom u-row-center u-flex-col u-p-r-20">
							<view class="first-title u-text-right u-font-28">
								竣工项目
							</view>
							<view class="second-title u-text-right u-font-40">
								{{projectInfo.storeInfo}}
							</view>
						</view>
					</u-col>
				</u-row>
			</view>
			<view class="project-types">
				<u-grid :col="3" :border="false">
					<u-grid-item :custom-style="{padding:'25rpx 0 20rpx'}">
						<view data-code="VideoPorject" @click="goToProjectLists">
							<u-image class="image-icon" :showLoading="true" src="/static/video_project.png"
								width="52rpx" height="39rpx">
							</u-image>
							<view class="grid-text">视频项目</view>
						</view>
					</u-grid-item>
					<u-grid-item :custom-style="{padding:'25rpx 0 20rpx'}">
						<view data-code="favoriteproject" @click="goToProjectLists">
							<u-image class="image-icon" :showLoading="true" src="/static/collect_project.png"
								width="48rpx" height="40rpx">
							</u-image>
							<view class="grid-text">收藏项目</view>
						</view>
					</u-grid-item>
					<u-grid-item :custom-style="{padding:'25rpx 0 20rpx'}">
						<view data-code="mapproject" @click="goToMap">
							<u-image class="image-icon" :showLoading="true" src="/static/map_project.png"
								mode="widthFix" width="48rpx" height="40rpx"></u-image>
							<view class="grid-text">项目地图</view>
						</view>
					</u-grid-item>
				</u-grid>
			</view>

			<view class="replyList">
				<view class="title u-font-32">
					最近调度
				</view>
				<view class="lists">
					<view @click="toNotificationDetail()" class="project-item" v-for="item in latasetProgressLists">

						<view class="project-name">
							<span>{{item.pj_base_project_name}}</span>
							<span class="time">{{item.modified_date}}</span>
						</view>
						<view class="project-info">
							<view class="all">
								<span class="icon"></span>
								资金累计：<span
									class="amount">{{ item.accumulate_invest ? item.accumulate_invest.split('.')[0] : '--'}}万</span>
							</view>
							<view class="year">
								<span class="icon"></span>
								年度累计：<span
									class="amount">{{item.year_accumulate_invest ? item.year_accumulate_invest.split('.')[0] : '--'}}万</span>
							</view>
							<view class="month">
								<span class="icon"></span>
								本月累计：<span
									class="amount">{{item.fund_volume ? item.fund_volume.split('.')[0] : '--'}}万</span>
							</view>
						</view>
					</view>
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
		getModelListViaCode,
		getConfigDataViaCode
	} from '@/api/apply/visualDev'
	import {
		getQueryDataHomePageDetailList
	} from "@/api/projectReport.js"
	import {
		moduleCodes
	} from '@/api/common'
	export default {
		mixins: [MescrollMixin, IndexMixin],
		data() {
			return {
				keyword: '',
				list: [],
				projectInfo:{
					liveInfo:'--',
					onGoingInfo:'--',
					storeInfo:'--'
				},
				upOption: {
					use: true,
					page: {
						num: 0,
						size: 10,
						time: null
					},
					empty: {
						use: true,
						icon: null,
						tip: "暂无相关数据",
						btnText: "",
						fixed: false,
						top: "100rpx",
						zIndex: 99
					}
				},
				bannerList: [{
					image: "data:image/jpeg;base64,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",
					title: "质量为先 诚信为本"
				}],
				actionList: [{
						name: "储备项目",
						icon: "bag",
						code: moduleCodes.StorePhaseProject
					},
					{
						name: "在建项目",
						icon: "play-circle",
						code: moduleCodes.BuildingPhaseProject
					},
					{
						name: "运营项目",
						icon: "rmb-circle",
						code: moduleCodes.OperationPhaseProject
					},
					{
						name: "关注项目",
						icon: "star",
						code: moduleCodes.favoriteproject
					},
					{
						name: "项目地图",
						icon: "map",
						code: moduleCodes.ProjectMap
					},
					{
						name: "待审核项目",
						icon: "order",
						code: moduleCodes.ProjectReview
					},
					{
						name: "待审核调度",
						icon: "lock",
						code: moduleCodes.ProcessReviewProjectItems
					},
					{
						name: "关注问题",
						icon: "warning",
						code: moduleCodes.ProjectIssues
					}
				],
				userInfo: {},
				notificationCount: 0,
				latasetProgressLists: [],
				// ...mapGetters(['userInfo']),
			}
		},
		onLoad() {
			this.userInfo = uni.getStorageSync('userInfo') || {}
			uni.$on('updateList', data => {})
			this.loadSwiper()
			this.loadDataHomePageDetail()
		},
		onUnload() {
			uni.$off('updateList')
		},
		onNavigationBarButtonTap(e) {
			if (e.index == 0) {
				uni.scanCode({
					success: res => {
						try {
							const result = JSON.parse(res.result)
							if (result.type === 'appDesignPreview') {
								uni.navigateTo({
									url: '/pages/apply/dynamicModel/index?isPreview=1&id=' + result.id,
									fail: (err) => {
										this.$u.toast("暂无此页面")
									}
								})
							}
						} catch (e) {}
					}
				});
			};
		},
		methods: {
			loadSwiper() {
				const query = {
					currentPage: 1,
					pageSize: 10
				}
				getModelListViaCode(moduleCodes.AppHomeSwiper, query).then(res => {
					this.bannerList = []
					let swipers = res.data.list
					for (let i in swipers) {
						let banner = {}
						banner.title = swipers[i].title
						let img = JSON.parse(swipers[i].image_url)
						let imgUrl = this.define.frontURL + img[0].url
						uni.request({
							url: imgUrl,
							responseType: 'arraybuffer',
							success: res => {
								if (res.statusCode === 200) {
									banner.image =
										`data:image/jpeg;base64,${uni.arrayBufferToBase64(res.data)}`
									this.bannerList.push(banner)
								}
							}
						})
					}
				}).catch(err => {})
			},
			loadProjectLataestProgress(page) {
				getModelListViaCode(moduleCodes.ProjectLatestProgress, {
					pageSize: page.size,
					currentPage: page.num
				}).then(res => {
					const {
						code,
						data: {
							list = [],
							pagination
						}
					} = res || {}
					if (code === 200) {
						this.latasetProgressLists = this.latasetProgressLists.concat(list)
						this.mescroll.endBySize(pagination.pageSize, pagination.total); //必传参数(当前页的数据个数, 总页数)
					} else {
						this.mescroll.endErr();

					}

				}).catch(() => {
					this.mescroll.endErr();

				})
			},
			loadDataHomePageDetail() {
				const userInfo = this.userInfo;
				getQueryDataHomePageDetailList({
					userInfo
				}).then(res => {
					const {
						code,
						data: {
							liveInfo = {},
							onGoingInfo = {},
							storeInfo = {}
						}
					} = res || {}
					if(code === 200){
						this.projectInfo = {
							liveInfo: liveInfo.sum,
							onGoingInfo: onGoingInfo.sum,
							storeInfo: storeInfo.sum
						}
					}

				}).catch(() => {

				})
			},
			toNotificationDetail(item) {
				uni.navigateTo({
					url: '/pages/project/detail/index'
				})
			},

			handleClick(item) {
				let path = ""
				// if (item.code === moduleCodes.StorePhaseProject || item.code === moduleCodes.BuildingPhaseProject || item
				// 	.code === moduleCodes.OperationPhaseProject) {
				// 	path = "/pages/project/list/index?phase=" + item.code
				// }
				if (item.code) {
					path = "/pages/project/list/index?phase=" + moduleCodes[item.code]
				}
				if (path) {
					uni.navigateTo({
						url: path
					})
				}
			},

			goToMap() {
				uni.navigateTo({
					url: '/pages/reportTable/projectMap/index'
				})
			},
			goToProjectLists(e) {
				console.log(e)
				const {
					currentTarget: {
						dataset = {}
					} = {}
				} = e || {};

				this.handleClick(dataset)
			}
		}
	}
</script>

<style scoped lang="scss">
	page {
		background-color: #F5F6F7;

		.u-icon {
			color: blue;
		}

		.index-v {
			padding: 0 32rpx;

			.banner {
				padding-top: 20rpx;
			}

			.project-lists {
				padding-top: 20rpx;
				height: 144rpx;

				.project-lists-item {
					width: 215rpx;
					height: 124rpx;
					color: #023659;

					.second-title {
						font-weight: 700;
						line-height: 54rpx;
					}

					.first-title {
						font-weight: 500;
						line-height: 42rpx;
					}

					&.unStart_project {
						background: url(../../static/pro_1.png) no-repeat center;
						background-size: cover;
					}

					&.doing_project {
						background: url(../../static/pro_2.png) no-repeat center;
						background-size: cover;
					}

					&.finish_project {
						background: url(../../static/pro_3.png) no-repeat center;
						background-size: cover;

						.first-title,
						.second-title {
							color: #DC6800;
						}
					}
				}
			}

			.project-types {
				padding-top: 20rpx;
				border-radius: 4rpx;

				.image-icon {
					margin: 0 auto;
				}

				.grid-text {
					font-size: 28rpx;
					line-height: 40rpx;
					color: #2C3548;
					margin-top: 13rpx;
				}
			}


			.search-box_sticky {
				margin-bottom: 20rpx;
			}

			.head-tabs {
				height: 104rpx;

				.head-tabs-item {
					font-size: 28rpx;
					color: #666666;
					line-height: 40rpx;
				}
			}

			.replyList {
				// padding: 0 32rpx;
				// padding-bottom: 120rpx;

				.title {
					line-height: 44rpx;
					padding-top: 32rpx;
					color: #071127;
					font-weight: 700;
				}

				.lists {
					.project-item {
						background: #fff;
						padding: 0 32rpx;
						margin-top: 20rpx;
						background-image: url(../../static/list_bg.png);
						background-size: 97rpx 71rpx;
						background-position: right bottom;
						background-repeat: no-repeat;

						.project-name {
							display: flex;
							justify-content: space-around;
							align-items: center;
							padding-top: 30rpx;

							span {
								flex: 0 0 499rpx;
								width: 499rpx;
								display: block;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
								font-size: 32rpx;
								line-height: 44rpx;
								color: #071127;

							}

							span.time {
								flex: 0 0 130rpx;
								font-size: 24rpx;
								line-height: 32rpx;
								color: rgba(50, 50, 51, 0.25);
							}
						}

						.project-info {
							display: flex;
							justify-content: flex-starts;
							align-items: center;
							flex-wrap: wrap;
							padding: 2rpx 0 32rpx;
							border-radius: 4rpx;

							&>view {
								flex: 1 1 50%;
								text-align: left;
								margin-top: 20rpx;
								padding-left: 36rpx;
								font-size: 28rpx;
								line-height: 40rpx;
								color: #5E6573;

								&>span.amount {
									color: #071127;
								}

								&:nth-of-type(2n) {
									border-left: 1px solid #D8D8D8;
									padding-left: 65rpx;
									background: url(../../static/type_icon2.png) no-repeat 29rpx center;
									background-size: 28rpx;
								}

								&:nth-of-type(1) {
									background: url(../../static/type_icon1.png) no-repeat left center;
									background-size: 28rpx;
								}

								&:nth-of-type(3) {
									background: url(../../static/type_icon3.png) no-repeat left center;
									background-size: 28rpx;
								}
							}
						}
					}
				}


			}
		}
	}
</style>
