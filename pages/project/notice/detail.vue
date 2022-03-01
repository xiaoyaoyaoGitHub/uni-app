<template>
	<view class="contacts-v">
		<view class="title u-font-40 u-text-center u-p-t-35 u-p-l-20 u-p-r-20">
			{{detailInfo.title}}
		</view>
		<view class="u-font-26 u-text-center u-p-15">
			{{format(detailInfo.lastModifyTime)}} {{detailInfo.creatorUser}}
		</view>
		<view decode class="u-font-30 u-text-left u-m-t-15 u-p-l-30 u-p-r-30">
			{{detailInfo.bodyText.replace(/<\/?p>/g,'')}}
		</view>

	</view>
</template>

<script>
	import {
		projectNoticeDetail
	} from "@/api/apply/visualDev.js"
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				detailInfo: {}
			}
		},
		onLoad(param) {
			this.userInfo = uni.getStorageSync('userInfo') || {}
			const {
				id
			} = param || {};
			this.queryStoreList(id)
		},
		computed: {
			baseURL() {
				return this.define.baseURL
			}
		},
		methods: {
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
			// 储备项目
			queryStoreList(id) {
				projectNoticeDetail(id).then(res => {
					const {
						code,
						data = {}
					} = res || {};
					if (code === 200) {

						this.detailInfo = data;
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #fff;

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
