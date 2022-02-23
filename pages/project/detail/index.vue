<template>
	<view class="contacts-v">
		<!-- <mescroll-body ref="mescrollRef"> -->
		<view class="project-info">
			<view class="project-name u-flex u-row-between ">
				<span class="u-flex-nowrap">
					{{projectInfo.pj_base_project_name}}
				</span>
				<span class="status">
					{{projectInfo.pj_base_project_phase}}
				</span>
			</view>
			<view class="project-time u-flex u-row-left">
				<view>
					<span class="label">
						创建时间：
					</span>
					<span class="desc">
						{{projectInfo.pj_base_project_update_date ? projectInfo.pj_base_project_update_date.split(' ')[0] : '--'}}
					</span>
				</view>
				<view>
					<span class="label">
						行业：
					</span>
					<span class="desc">
						{{projectInfo.pj_base_business_category}}
					</span>
				</view>

			</view>
			<view class="map">
				<!-- <map v-if="!projectInfo.pj_base_project_position" name=""></map> -->
				<map :latitude="latitude" :longitude="longitude" :markers="covers"></map>
			</view>
			<view class="amount u-flex">
				<view class="u-text-center u-flex-6">
					<view class="title">
						总投资（万元）
					</view>
					<view class="sum">
						{{projectInfo.pj_fund_invest_total}}
					</view>
				</view>
				<view class="u-text-center u-flex-6">
					<view class="title">
						今年计划投资（万元）
					</view>
					<view class="sum planColor">
						{{projectInfo.pj_fund_invest_currentyear}}
					</view>
				</view>
			</view>
		</view>
		<!-- 选项卡 -->
		<view class="info-tabs">
			<u-tabs :list="tabs" font-size="32" :is-scroll="false" height="90" :current="current" @change="change"
				bar-width="60" :barStyle="{bottom:'-8rpx'}"></u-tabs>
			<!-- 基本信息 -->
			<view class="content" v-if="current === 0">
				<uni-list>
					<uni-list-item class="list-item">
						<template slot="header">
							<view class="label">
								在建状态
							</view>
						</template>
						<template slot="body">
							<view class="desc">
								{{projectInfo.pj_base_project_phase}}
							</view>
						</template>
					</uni-list-item>
					<uni-list-item class="list-item">
						<template slot="header">
							<view class="label">
								产业
							</view>
						</template>
						<template slot="body">
							<view class="desc">
								{{projectInfo.pj_base_industry}}
							</view>
						</template>
					</uni-list-item>
					<uni-list-item class="list-item">
						<template slot="header">
							<view class="label">
								集群
							</view>
						</template>
						<template slot="body">
							<view class="desc">
								{{projectInfo.pj_base_project_cluster}}
							</view>
						</template>
					</uni-list-item>
					<uni-list-item class="list-item">
						<template slot="header">
							<view class="label">
								部门
							</view>
						</template>
						<template slot="body">
							<view class="desc">
								{{projectInfo.pj_base_province_department}}
							</view>
						</template>
					</uni-list-item>

				</uni-list>
			</view>
			<!-- 在建进度 -->
			<view class="content schedule u-border-top" v-if="current === 1">
				<view v-if="scheduleList.length === 0" class="u-text-center u-font-24">
					暂无进度
				</view>
				<view v-else class="schedule-total u-border" :key="index" v-for="(item, index) in scheduleList">
					<view class="title u-flex u-border-bottom">
						<span>
							{{item.name}}
						</span>
						<span class="time">
							调度月份：{{item.schedule_month}}
						</span>
						<span class="status">
							{{item.is_ok === '是' ? '符合预期':'不符合预期'}}
						</span>
					</view>
					<view class="progress">
						<view class="u-flex">
							<view class="label project">
								建筑进度
							</view>
							<u-line-progress inactive-color="#F2F2F2" :show-percent="false" active-color="#104DFF"
								height="16" :percent="Number(item.fund_progress) || 0">
							</u-line-progress>
							<view class="precent project">
								{{item.fund_progress || 0}}%
							</view>
						</view>
						<view class="u-flex">
							<view class="label amount">
								资金进度
							</view>
							<u-line-progress inactive-color="#F2F2F2" :show-percent="false" active-color="#FF8C2A"
								height="16" :percent="Number(item.progress) || 0">
							</u-line-progress>
							<view class="precent amount">
								{{item.progress || 0}}%
							</view>
						</view>
					</view>

					<view class="schedule-list u-border-top">
						<view class="u-flex">
							<span class="label">总投资（万元）</span>
							<span class="desc">
								{{item.total_invest}}
							</span>
						</view>
						<view class="u-flex">
							<span class="label">去年完成（万元）</span>
							<span class="desc">
								{{item.last_year_accumulate_invest}}
							</span>
						</view>
						<view class="u-flex">
							<span class="label">今年完成（万元）</span>
							<span class="desc">
								{{item.year_accumulate_invest}}
							</span>
						</view>
						<view class="u-flex">
							<span class="label">本月完成（万元）</span>
							<span class="desc">
								{{item.accumulate_invest}}
							</span>
						</view>
					</view>

				</view>

			</view>
			<!-- 项目图片 -->
			<view class="content pictures u-border-top" v-if="current === 2">
				<view class="update-pic" @click="upLoadImage">
					<u-icon color="#DCDEE0" label-color="#DCDEE0" name="camera" label="上传" size="39" label-pos="bottom">
					</u-icon>

				</view>
				<view class="types" v-if="imgLists.length !== 0" v-for="(item) in imgLists">
					<view class="time">
						2021-11-11
					</view>
					<view class="pictures-content">
						<view class="title">
							<span>
								图片分类：
							</span>
							<span class="desc">
								{{item.category}}
							</span>
						</view>
						<view class="images-desc">
							{{item.description}}
						</view>
						<view class="images u-flex">
							<view class="image">
								<image :src="item.previewPath"></image>
							</view>
							<!-- <view class="image">

							</view>
							<view class="image">

							</view>
							<view class="image">

							</view>
							<view class="image">

							</view> -->
						</view>
					</view>
				</view>
				<view v-if="imgLists.length === 0" class="u-text-center u-font-24 u-p-t-20">
					暂无图片
				</view>
			</view>
			<!-- 项目问题 -->
			<view class="content problem u-border-top" v-if="current === 3">
				<view class="problem-content u-border" :key="index" v-for="(item, index) in projectIssues">
					<view class="problem-title u-border-bottom u-flex">
						<span>问题分类：</span>
						<span class="content">
							{{item.issue_category}}
						</span>
						<span class="status">
							{{item.is_solved}}
						</span>
					</view>
					<view class="problem-relate u-flex u-row-between">
						<view class="person">
							<span class="label">
								关注人
							</span>
							<span class="content">
								{{item.modified_by}}
							</span>
						</view>
						<view class="depart">
							<span class="label">
								涉及机构
							</span>
							<span class="content">
								{{item.related}}
							</span>
						</view>
					</view>
					<view class="problem-list u-flex u-border-top u-col-top">
						<view class="list-title">
							问题描述
						</view>
						<view class="list-content">
							{{item.concerns}}
						</view>
					</view>
					<view class="problem-list u-flex u-border-top u-col-top">
						<view class="list-title">
							结果描述
						</view>
						<view class="list-content">
							{{item.solved_comment}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- </mescroll-body> -->
	</view>
</template>

<script>
	import {
		getImUser
	} from '@/api/common.js'
	import {
		getConfigDataViaCode,
		getProjectInfo,
		getModelListViaCode,
		projectImageList
	} from "@/api/apply/visualDev.js"
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				id: 0, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: 39.909,
				longitude: 116.39742,
				covers: [],
				downOption: {
					use: true,
					auto: true
				},
				upOption: {
					page: {
						num: 0,
						size: 20,
						time: null
					},
					empty: {
						use: true,
						// icon: resources.message.nodata,
						tip: "暂无数据",
						fixed: true,
						top: "300rpx",
					},
					textNoMore: '没有更多数据',
				},
				keyword: '',
				tabs: [{
					name: '基本信息'
				}, {
					name: '在建进度'
				}, {
					name: '项目图片'
				}, {
					name: '项目问题',
				}],
				current: 0,
				projectInfo: {},
				scheduleList: [],
				projectIssues: [],
				imgLists: []
			}
		},
		watch: {
			current: function(newVal, oldVal) {
				// console.log(newVal, oldVal)
				if (newVal === 1) {
					this.getScheduleList()
				}
				if (newVal === 2) {
					this.getImages()
				}
				if (newVal === 3) {
					this.getProjectIssue()
				}
			}
		},
		onLoad(params) {
			const {
				id,
				modelId,
				pj_base_project_phase
			} = params || {};
			this.projectId = id;
			this.getData(modelId, id)
		},
		computed: {
			baseURL() {
				return this.define.baseURL
			}
		},
		methods: {
			change(index) {
				// console.log(index)
				this.current = index
			},
			upLoadImage() {
				uni.navigateTo({
					url: `/pages/project/upload/index?id=${this.projectId}`
				})
			},
			getConfig(modelId) {
				getConfigDataViaCode(modelId).then(res => {
					console.log(res)
				})
			},
			getData(modelId, id) {
				console.log(modelId, id)
				getProjectInfo(modelId, id).then(res => {
					console.log(res)
					const {
						code,
						data: {
							data: projectInfo = '{}'
						}
					} = res || {}
					if (code === 200) {
						this.projectInfo = JSON.parse(projectInfo);
						const {
							pj_base_project_position = '{}'
						} = this.projectInfo || {};

						const pj_base_project_positionToJson = JSON.parse(pj_base_project_position) || {};
						console.log('pj_base_project_positionToJson', pj_base_project_positionToJson)
						const {
							formattedAddress
						} = pj_base_project_positionToJson || {};
						this.latitude = pj_base_project_positionToJson.latitude;
						this.longitude = pj_base_project_positionToJson.longitude;
						this.covers = [{
							latitude: this.latitude,
							longitude: this.longitude,
							width: 5,
							height: 5,
							title: formattedAddress,
							iconPath: '../../../static/mark-little.jpg'
						}]
					}
				}).catch(err => {
					console.log(err)
				})
			},
			// 在建进度
			getScheduleList() {
				const code = 'BuildProgress';
				getModelListViaCode(code, {
					currentPage: 1,
					pageSize: 10000,
					sort: "asc",
					sidx: "seq",
					json: JSON.stringify({
						parent_id: Number(this.projectId)
					})
				}).then(res => {
					// console.log(res)
					const {
						code,
						data: {
							list = []
						} = {}
					} = res || {};
					if (code === 200) {
						this.scheduleList = list
					}
				})
			},
			getImages() {
				console.log('请求图片')
				projectImageList({
					keyword: "",
					projectId: this.projectId
				}).then(res => {
					const {
						code,
						data: {
							list = []
						} = {}
					} = res || {};
					this.imgLists = list;
				})
			},
			getProjectIssue() {
				const code = 'ProjectIssues';
				const data = {
					"currentPage": 1,
					"pageSize": 100,
					"sort": 'desc',
					"sidx": 'is_solved',
					"json": JSON.stringify({
						parent_id: String(this.projectId)
					})

				}
				getModelListViaCode(code, data).then(res => {
					const {
						code,
						data: {
							list = []
						} = {}
					} = res || {};
					if (code === 200) {
						this.projectIssues = list
					}
				})
			},
			upCallback(page) {
				let query = {
					currentPage: page.num,
					pageSize: page.size,
					keyword: this.keyword
				}
				getImUser(query, {
					load: page.num == 1
				}).then(res => {
					this.mescroll.endSuccess(res.data.list.length);
					if (page.num == 1) this.list = [];
					const list = res.data.list;
					this.list = this.list.concat(list);
				}).catch(() => {
					this.mescroll.endErr();
				})
			},
			search() {
				// 节流,避免输入过快多次请求
				this.searchTimer && clearTimeout(this.searchTimer)
				this.searchTimer = setTimeout(() => {
					this.list = [];
					this.mescroll.resetUpScroll();
				}, 300)
			},
			detail(id) {
				uni.navigateTo({
					url: '/pages/message/userDetail/index?userId=' + id,
				})
			}
		}
	}
</script>

<style lang="scss">
	.contacts-v {
		background: #F5F6F7;



		.project-info {
			background: #fff;
			box-shadow: 0 0 4rpx 24rpx 646566;
			padding: 0 32rpx;

			.project-name {
				padding-top: 35rpx;

				span {
					font-size: 32rpx;
					line-height: 44rpx;
					color: #071127;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;

					&.status {
						flex: 0 0 130rpx;
						text-align: center;
						font-size: 24rpx;
						line-height: 33rpx;
						color: #152810;
						// padding: 3rpx 17rpx;
						padding: 3rpx 0;
						background: #D5F4CF;
					}
				}
			}

			.map {

				// overflow: hidden;
				map {
					width: 100%;
					height: 100%;
				}
			}

			.project-time {
				padding: 20rpx 0 18rpx;

				&>view {
					.label {
						font-size: 28rpx;
						line-height: 40rpx;
						color: #5E6573;
					}

					.desc {
						font-size: 28rpx;
						line-height: 40rpx;
						color: #071127;
						margin-right: 48rpx;
					}
				}

			}

			.map {
				height: 200rpx;
				background: #eee;
			}

			.amount {
				padding: 20rpx 0 10rpx;
				position: relative;

				&:after {
					content: '';
					position: absolute;
					left: 0;
					right: 0;
					top: 27rpx;
					bottom: 24rpx;
					margin: auto;
					width: 0;
					border-right: 1px solid #E5E5E5;
				}

				.title {
					font-size: 28rpx;
					line-height: 40rpx;
					color: #5E6573;
				}

				.sum {
					font-size: 44rpx;
					line-height: 62rpx;
					color: #0060F4;
					margin-top: 16rpx;

					&.planColor {
						color: #F47500;
					}
				}
			}
		}

		.info-tabs {
			margin-top: 20rpx;
			background: #fff;

			.pictures {
				position: relative;

				.update-pic {
					position: fixed;
					right: 32rpx;
					bottom: 90rpx;
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					background: rgba(0, 0, 0, .65);
					text-align: center;
					padding-top: 10rpx;
				}

				.types {
					padding-bottom: 32rpx;

					.time {
						background: #F7F8FA;
						font-size: 24rpx;
						line-height: 33rpx;
						color: #5E6573;
						padding: 8rpx 32rpx;
					}

					.pictures-content {
						padding: 0 32rpx;

						.title {
							padding-top: 20rpx;
							font-size: 32rpx;
							line-height: 48rpx;
							color: #5E6472;

							.desc {
								font-weight: bolder;
								color: #071127;
							}
						}

						.images-desc {
							font-size: 28rpx;
							line-height: 42rpx;
							color: #5E6472;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							padding-top: 16rpx;
						}

						.images {
							overflow-x: auto;
							padding-top: 16rpx;

							.image {
								flex: 0 0 160rpx;
								height: 160rpx;
								background: #333;
								margin-right: 14rpx;
							}
						}
					}

				}
			}

			.problem {
				padding: 26rpx 32rpx;

				.problem-content {
					.problem-title {
						padding: 16rpx 20rpx;
						position: relative;

						span {
							font-size: 32rpx;
							line-height: 48rpx;
							color: #5E6472;

							&.content {
								font-weight: bolder;
								color: #071127;
							}

							&.status {
								position: absolute;
								right: 20rpx;
								font-size: 24rpx;
								line-height: 33rpx;
								color: #8F1600;
								padding: 3rpx 16rpx;
								background-color: #F4D5CF;
								border-radius: 20rpx;
							}
						}
					}

					.problem-relate {
						padding: 20rpx 48rpx 20rpx 0;
						margin: 0 20rpx;

						&>view {
							.label {
								font-size: 28rpx;
								line-height: 42rpx;
								color: #5E6472;
								padding-left: 36rpx;
							}

							.content {
								font-size: 28rpx;
								line-height: 42rpx;
								color: #071127;
								margin-left: 18rpx;
							}

							&.person {
								.label {
									background: url(../../../static/problem_icon1.png) no-repeat left center;
									background-size: 28rpx;
								}
							}

							&.depart {
								.label {
									background: url(../../../static/problem_icon2.png) no-repeat left center;
									background-size: 28rpx;
								}
							}
						}
					}

					.problem-list {
						margin: 0 20rpx;
						padding: 20rpx 0;

						.list-title {
							flex: 0 0 135rpx;
							line-height: 48rpx;
							font-size: 28rpx;
							color: #5E6472;
						}

						.list-content {
							line-height: 48rpx;
							font-size: 28rpx;
							color: #071127;
						}
					}
				}
			}

			.list-item {
				.label {
					width: 220rpx;
					font-size: 28rpx;
					line-height: 48rpx;
					color: #5E6472;
				}

				.desc {
					font-size: 32rpx;
					line-height: 48rpx;
					color: #071127;
				}
			}

			.schedule {
				padding: 25rpx 32rpx;

				.schedule-total {
					margin-bottom: 20rpx;

					.title {
						padding: 18rpx 20rpx 14rpx;
						// margin: 0 20rpx;
						position: relative;

						span {
							font-size: 32rpx;
							line-height: 48rpx;
							color: #071127;

							&.time {
								font-size: 24rpx;
								line-height: 33rpx;
								color: #5E6573;
								padding-left: 20rpx;
							}

							&.status {
								position: absolute;
								right: 0;
								font-size: 24rpx;
								line-height: 33rpx;
								color: #005F56;
							}
						}
					}

					.progress {
						margin: 0 20rpx;
						padding: 20rpx 0;

						&>view {
							margin-top: 8rpx;

							.label {
								flex: 0 0 173rpx;
								padding-left: 32rpx;
								font-size: 28rpx;
								line-height: 42rpx;
								color: #071127;

								&.project {
									background: url(../../../static/schedule_icon1.png) no-repeat left center;
									background-size: 28rpx;
								}

								&.amount {
									background: url(../../../static/schedule_icon2.png) no-repeat left center;
									background-size: 28rpx;
								}
							}

							.precent {
								color: #104DFF;
								font-size: 24rpx;
								line-height: 42rpx;
								margin-left: 14rpx;

								&.amount {
									color: #FF8C2A;
								}
							}
						}

					}

					.schedule-list {
						margin: 0 20rpx;
						padding: 20rpx 0;

						&>view {
							margin-top: 20rpx;

							&:first-of-type {
								margin-top: 0;
							}

							.label {
								font-size: 28rpx;
								line-height: 42rpx;
								color: #5E6472;
								flex: 0 0 256rpx;
							}

							.desc {
								font-size: 28rpx;
								line-height: 42rpx;
								color: #071127;
							}
						}
					}
				}
			}
		}
	}
</style>
