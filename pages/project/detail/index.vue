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
				<view class="schedule-total u-border">
					<view class="title u-flex u-border-bottom">
						<span>
							总体进度
						</span>
						<span class="time">
							调度月份：2021-06
						</span>
						<span class="status">
							符合预期
						</span>
					</view>
					<view class="progress">
						<view class="u-flex">
							<view class="label project">
								建筑进度
							</view>
							<u-line-progress inactive-color="#F2F2F2" :show-percent="false" active-color="#104DFF"
								height="16" :percent="70">
							</u-line-progress>
							<view class="precent project">
								70%
							</view>
						</view>
						<view class="u-flex">
							<view class="label amount">
								资金进度
							</view>
							<u-line-progress inactive-color="#F2F2F2" :show-percent="false" active-color="#FF8C2A"
								height="16" :percent="70">
							</u-line-progress>
							<view class="precent amount">
								70%
							</view>
						</view>
					</view>

					<view class="schedule-list u-border-top">
						<view class="u-flex">
							<span class="label">总投资（万元）</span>
							<span class="desc">
								3000.00
							</span>
						</view>
						<view class="u-flex">
							<span class="label">总投资（万元）</span>
							<span class="desc">
								3000.00
							</span>
						</view>
						<view class="u-flex">
							<span class="label">总投资（万元）</span>
							<span class="desc">
								3000.00
							</span>
						</view>
						<view class="u-flex">
							<span class="label">总投资（万元）</span>
							<span class="desc">
								3000.00
							</span>
						</view>
					</view>

				</view>
				<view class="schedule-total u-border">
					<view class="title u-flex u-border-bottom">
						<span>
							工程招投标
						</span>
						<span class="time">
							调度月份：2021-06
						</span>
						<span class="status">
							符合预期
						</span>
					</view>
					<view class="progress">
						<view class="u-flex">
							<view class="label project">
								建筑进度
							</view>
							<u-line-progress inactive-color="#F2F2F2" :show-percent="false" active-color="#104DFF"
								height="16" :percent="70">
							</u-line-progress>
							<view class="precent project">
								70%
							</view>
						</view>
						<view class="u-flex">
							<view class="label amount">
								资金进度
							</view>
							<u-line-progress inactive-color="#F2F2F2" :show-percent="false" active-color="#FF8C2A"
								height="16" :percent="70">
							</u-line-progress>
							<view class="precent amount">
								70%
							</view>
						</view>
					</view>

					<view class="schedule-list u-border-top">
						<view class="u-flex">
							<span class="label">总投资（万元）</span>
							<span class="desc">
								3000.00
							</span>
						</view>
						<view class="u-flex">
							<span class="label">总投资（万元）</span>
							<span class="desc">
								3000.00
							</span>
						</view>
						<view class="u-flex">
							<span class="label">总投资（万元）</span>
							<span class="desc">
								3000.00
							</span>
						</view>
						<view class="u-flex">
							<span class="label">总投资（万元）</span>
							<span class="desc">
								3000.00
							</span>
						</view>
					</view>

				</view>
			</view>
			<!-- 项目图片 -->
			<view class="content pictures" v-if="current === 2">
				<view class="update-pic" @click="upLoadImage">
					<u-icon color="#DCDEE0" label-color="#DCDEE0" name="camera" label="上传" size="39" label-pos="bottom">
					</u-icon>

				</view>
				<view class="types" v-for="(item) in [1,3,4]">
					<view class="time">
						2021-11-11
					</view>
					<view class="pictures-content">
						<view class="title">
							<span>
								图片分类：
							</span>
							<span class="desc">
								土地征收
							</span>
						</view>
						<view class="images-desc">
							描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述
						</view>
						<view class="images u-flex">
							<view class="image">

							</view>
							<view class="image">

							</view>
							<view class="image">

							</view>
							<view class="image">

							</view>
							<view class="image">

							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 项目问题 -->
			<view class="content problem u-border-top" v-if="current === 3">
				<view class="problem-content u-border">
					<view class="problem-title u-border-bottom u-flex">
						<span>问题分类：</span>
						<span class="content">
							手续问题
						</span>
						<span class="status">
							待解决
						</span>
					</view>
					<view class="problem-relate u-flex u-row-between">
						<view class="person">
							<span class="label">
								关注人
							</span>
							<span class="content">
								陈某某
							</span>
						</view>
						<view class="depart">
							<span class="label">
								涉及机构
							</span>
							<span class="content">
								其他
							</span>
						</view>
					</view>
					<view class="problem-list u-flex u-border-top u-col-top">
						<view class="list-title">
							问题描述
						</view>
						<view class="list-content">
							结果描述结果描述结果描述结果描述结果描述结果描述结果描述结果描述结果描述结果描述结果描述结果描述结果描述结果描述结果描述结果描述结果描述结果描述结果描述结果描述结果描述结果描述结果描述结果描述
						</view>
					</view>
					<view class="problem-list u-flex u-border-top u-col-top">
						<view class="list-title">
							结果描述
						</view>
						<view class="list-content">
							结果描述结果描述结果描述结果描述结果描述结果描述结果描述结果描述结果描述结果描述结果描述结果描述结果描述结果描述结果描述结果描述结果描述结果描述结果描述结果描述结果描述结果描述结果描述结果描述
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
		getProjectInfo
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
				projectInfo: {}
			}
		},
		onLoad() {
			// console.log(this.$route)
			const {
				id,
				modelId,
				pj_base_project_phase
			} = this.$route.query || {};
			// this.getConfig(modelId)
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
					url: '/pages/project/upload/index'
				})
			},
			getConfig(modelId) {
				getConfigDataViaCode(modelId).then(res => {
					console.log(res)
				})
			},
			getData(modelId, id) {
				getProjectInfo(modelId, id).then(res => {
					const {
						code,
						data: {
							data: projectInfo = '{}'
						}
					} = res || {}
					console.log(JSON.parse(projectInfo))
					if (code === 200) {
						this.projectInfo = JSON.parse(projectInfo);
						const {
							pj_base_project_position = '{}'
						} = this.projectInfo || {};
					
						const pj_base_project_positionToJson = JSON.parse(pj_base_project_position) || {};
						console.log('pj_base_project_positionToJson',pj_base_project_positionToJson)
						const { formattedAddress } = pj_base_project_positionToJson || {};
						this.latitude = pj_base_project_positionToJson.latitude;
						this.longitude = pj_base_project_positionToJson.longitude;
						this.covers = [{
							latitude: this.latitude,
							longitude: this.longitude,
							width:20,
							height: 20,
							title: formattedAddress,
							iconPath: '../../../static/mark.jpeg'
						}]
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
