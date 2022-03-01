<template>
	<view class="contacts-v">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :sticky="true"
			:down="downOption" :up="upOption" :bottombar="false">
			<view class="search-box search-box_sticky u-flex u-border-bottom">
				<u-search class="search-input" placeholder="请输入项目名称搜索" v-model="keyword" height="72" :show-action="true"
					:action-style="{color:'#071127',lineHeight:48 + 'rpx', fontSize:32 + 'rpx'}" @custom="search"
					bg-color="#F7F8FA" placeholder-color="#C1C3C9" search-icon-color="#C1C3C9" shape="square">
				</u-search>
			</view>

			<view class="lists">
				<view class="project-item" data-id="item.id" v-for="item in projectLists">

					<view class="project-name u-border-bottom">
						<span class="name">{{item.title}}</span>
						<!-- <span
							:class="{'unUpdate': item.pj_review_status === '未提交', 'wait': item.pj_review_status === '等待审核','success': item.pj_review_status === '审核通过', 'fail': item.pj_review_status === '审核驳回'}"
							class="status u-text-center">{{item.pj_review_status}}</span> -->
					</view>
					<view class="project-info">
						<view class="all">
							<span class="icon"></span>
							发布人员：<span class="amount">{{item.creatorUser}}</span>
						</view>
						<view class="month">
							<span class="icon"></span>
							发布时间：<span class="amount">{{format(item.lastModifyTime)}}</span>
						</view>
					</view>
				</view>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import {
		projectNotice
	} from "@/api/apply/visualDev.js"
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				downOption: {
					use: true,
					auto: true
				},
				upOption: {
					use: true,
					page: {
						num: 0,
						size: 20,
						time: null
					},
					empty: {
						use: true,
						icon: "static/nodata.png",
						tip: "暂无数据",
						fixed: true,
						top: "200rpx",
					},
					textNoMore: '没有更多数据',
				},
				keyword: '',
				selectType: '',


				projectLists: []
			}
		},
		onLoad(param) {
			this.userInfo = uni.getStorageSync('userInfo') || {}
			// let title = "项目列表"
			// let phase = param.phase
			// this.pageType = phase
			// uni.setNavigationBarTitle({
			// 	title: moduleTitle[phase]
			// })
			// this.getDictionarySelects();
			// this.getDepartmentSelects()

		},
		computed: {
			baseURL() {
				return this.define.baseURL
			}
		},
		methods: {
			upCallback(page) {
				let query = {
					currentPage: page.num,
					pageSize: page.size,
					keyword: this.keyword
				};
				this.queryStoreList(query)
			},
			format(time, format = 'yyyy-MM-dd') {
				var t = new Date(time);
				var tf = function(i) {
					return (i < 10 ? '0' : '') + i
				};
				return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
					switch (a) {
						case 'yyyy':
							return tf(t.getFullYear());
							break;
						case 'MM':
							return tf(t.getMonth() + 1);
							break;
						case 'mm':
							return tf(t.getMinutes());
							break;
						case 'dd':
							return tf(t.getDate());
							break;
						case 'HH':
							return tf(t.getHours());
							break;
						case 'ss':
							return tf(t.getSeconds());
							break;
					}
				})
			},
			inputConfirm() {
				this.amountSelectShow = false;
				this.projectLists = [];
				this.mescroll.resetUpScroll();
			},
			// 储备项目
			queryStoreList(data) {
				console.log(data)
				projectNotice(data).then(res => {
					const {
						code,
						data: {
							list = [],
							pagination = {}
						} = {}
					} = res || {};
					if (code === 200) {

						this.projectLists = [...this.projectLists, ...list]
						this.mescroll.endBySize(pagination.pageSize, pagination.total); //必传参数(当前页的数据个数, 总页数)
					}
				})
			},

			downCallback() {
				this.projectLists = [];
				this.mescroll.resetUpScroll();
			},

			search() {
				// 节流,避免输入过快多次请求
				this.searchTimer && clearTimeout(this.searchTimer)
				this.searchTimer = setTimeout(() => {
					this.projectLists = [];
					this.mescroll.resetUpScroll();
				}, 300)
			},

		}
	}
</script>

<style lang="scss">
	page {
		background: #F5F6F7;

		.contacts-v {
			.search-box {
				.search-input {
					width: 606rpx;
				}

				.search-btn {
					padding: 0 16rpx;
					font-size: 32rpx;
					line-height: 48rpx;
					color: #071127;

					&:after {
						border: none;
					}
				}
			}

			.selects {
				background: #fff;
				padding: 20rpx 20rpx;
				overflow-x: auto;

				.select {
					margin-right: 19rpx;

					&:last-child {
						margin-right: 0;
					}

					.selectBtn {
						background: #F7F6F6;
						position: relative;
						font-size: 28rpx;
						line-height: 40rpx;
						color: #2C3548;
						padding: 12rpx 58rpx 12rpx 28rpx;
						height: 64rpx;
						border-radius: 0;

						&:after {
							border: none;
						}

						&:before {
							content: '';
							position: absolute;
							right: 28rpx;
							top: 0;
							bottom: 0;
							margin: auto;
							display: block;
							width: 0;
							height: 0;
							border: 8rpx solid #DCDEE0;
							border-top-color: transparent;
							border-right-color: transparent;
							transform: rotateZ(-45deg) translateY(-50%);
						}

						&.active {
							background: #F2F6FF;
							position: relative;

							&:before {
								border: 8rpx solid #2566F2;
								border-top-color: transparent;
								border-right-color: transparent;
								transform: rotateZ(-225deg) translateY(-25%);
							}
						}
					}
				}
			}

			.lists {
				padding: 0 24rpx;

				.project-item {
					background: #fff;
					padding: 0 32rpx;
					margin-top: 20rpx;
					background-image: url(../../../static/list_bg.png);
					background-size: 97rpx 71rpx;
					background-position: right bottom;
					background-repeat: no-repeat;

					.project-name {
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 30rpx 0 13rpx;

						span.name {
							// flex: 0 0 499rpx;
							// width: 499rpx;
							// display: block;
							// overflow: hidden;
							// text-overflow: ellipsis;
							// white-space: nowrap;
							font-size: 32rpx;
							line-height: 44rpx;
							color: #071127;
							font-weight: bolder;
						}

						span.status {
							// flex: 0 0 130rpx;
							flex: 0 0 72rpx;
							padding: 3rpx 16rpx;
							font-size: 24rpx;
							line-height: 32rpx;
							color: rgba(50, 50, 51, 0.25);
							border-radius: 20rpx;
							font-weight: normal;
							white-space: nowrap;

							&.wait {
								color: #ED4F00;
								background: rgba(242, 167, 31, 0.13);
							}

							&.unUpdate {
								color: #363636;
								background: rgba(159, 159, 159, 0.13);
							}

							&.success {
								color: #152810;
								background: rgba(213, 244, 207, 0.3);
							}

							&.fail {
								color: #8F1600;
								background: rgba(244, 213, 207, 0.6);
							}
						}
					}

					.project-info {
						display: flex;
						justify-content: flex-starts;
						align-items: flex-start;
						flex-wrap: wrap;
						flex-direction: column;
						padding: 2rpx 0 32rpx;
						border-radius: 4rpx;

						&>view {
							flex: 1;
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
								// border-left: 1px solid #D8D8D8;
								// padding-left: 36rpx;
								background: url(../../../static/info_icon2.png) no-repeat left center;
								background-size: 28rpx;
							}

							&:nth-of-type(1) {
								background: url(../../../static/info_icon1.png) no-repeat left center;
								background-size: 28rpx;
							}

							&:nth-of-type(3) {
								background: url(../../../static/info_icon3.png) no-repeat left center;
								background-size: 28rpx;
							}
						}
					}
				}
			}

			.amount-scope {
				padding: 20rpx;
			}

		}
	}
</style>
