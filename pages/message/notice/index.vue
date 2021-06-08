<template>
	<view class="notice-v">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :sticky="true"
			:down="downOption" :up="upOption" :bottombar="false">
			<view class="search-box search-box_sticky">
				<u-search placeholder="请输入关键词搜索" v-model="keyword" height="72" :show-action="false" @change="search"
					bg-color="#f0f2f6" shape="square">
				</u-search>
			</view>
			<view class="u-flex-col notice-list">
				<view class="u-flex notice-item" v-for="(item, i) in list" :key="i" @click="detail(item)">
					<view class="notice-item-img notice-item-icon u-flex u-row-center">
						<text class="icon-ym icon-ym-sysNotice" />
					</view>
					<view class="u-flex-col notice-item-txt">
						<view class="u-flex titleBox">
							<text class="redDot" v-if="!item.isRead"></text>
							<text class="title u-line-1">{{item.title}}</text>
						</view>
						<text class="releaseUser">发布者：{{item.creatorUser}}</text>
					</view>
				</view>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import {
		getNoticeList,
		toNoticeDetail
	} from '@/api/message.js'
	import resources from '@/libs/resources.js'
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
					page: {
						num: 0,
						size: 20,
						time: null
					},
					empty: {
						use: true,
						icon: resources.message.nodata,
						tip: "暂无数据",
						fixed: true,
						top: "300rpx",
					},
					textNoMore: '没有更多数据',
				},
				keyword: '',
				list: [],
				isRead:0
			}
		},
		onLoad() {
			this.eventHub.$on('refresh', () => {
				this.list = [];
				this.mescroll.resetUpScroll();
			})
		},
		onUnload() {
			this.eventHub.$off('refresh')
		},
		methods: {
			upCallback(page) {
				let query = {
					currentPage: page.num,
					pageSize: page.size,
					keyword: this.keyword,
					type: 1
				}
				getNoticeList(query, {
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
			detail(item) {
				item.isRead=1
				uni.navigateTo({
					url: '../noticeDetail/index?notifyid=' + item.id
				});
			}
		}
	}
</script>

<style lang="scss">
	page {}

	.notice-v {
		.notice-list {
			padding: 0 32rpx;
			background-color: #fff;

			.notice-item {
				height: 132rpx;
				border-bottom: 1px solid #ECECEC;

				.notice-item-img {
					width: 96rpx;
					height: 96rpx;
					border-radius: 16rpx;
					overflow: hidden;
					margin-right: 16rpx;
					flex-shrink: 0;
				}

				.notice-item-txt {
					width: calc(100% - 112rpx);
					.titleBox {
						.redDot {
							height: 16rpx;
							width: 16rpx;
							border-radius: 50%;
							background: #FE5146;
							display: inline-block;
							margin-right: 6rpx;
							flex-shrink: 0;
						}
					}

					.title {
						font-size: 32rpx;
					}

					.releaseUser {
						color: #C6C6C6;
						font-size: 28rpx;
					}
				}

				.notice-item-icon {
					background-color: #3B87F7;
					border-radius: 50%;
					.icon-ym {
						color: #fff;
						font-size: 50rpx;
					}
				}
			}
		}
	}
</style>
