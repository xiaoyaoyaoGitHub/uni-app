<template>
	<view class="index-v">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :sticky="true"
			:up="upOption" :bottombar="false">
			<view class="search-box_sticky">
				<view class="search-box">
					<u-search placeholder="请输入关键词搜索" v-model="keyword" height="72" :show-action="false" @change="search"
						bg-color="#f0f2f6" shape="square">
					</u-search>
				</view>
				<view class="head-tabs u-flex u-row-around u-border-bottom">
					<view class="head-tabs-item" @click="openPage('/pages/message/sysMsg/index')">
						<text class="icon-ym icon-ym-xitong u-m-r-4 u-font-30" />
						<text>系统</text>
					</view>
					<view class="head-tabs-item" @click="openPage('/pages/message/notice/index')">
						<text class="icon-ym icon-ym-gonggao u-m-r-4 u-font-30" />
						<text>公告</text>
					</view>
					<view class="head-tabs-item" @click="openPage('/pages/workFlow/flowTodo/index')">
						<text class="icon-ym icon-ym-daiban1 u-m-r-4 u-font-30" />
						<text>待办</text>
					</view>
				</view>
			</view>
			<view class="replyList">
				<view class="reply-item u-border-bottom u-flex" @click="openPage('/pages/message/notice/index')">
					<view class="reply-item-img reply-item-icon u-flex u-row-center">
						<text class="icon-ym icon-ym-sysNotice" />
					</view>
					<view class="reply-item-txt u-flex-1">
						<view class="reply-item-cell reply-item-title u-flex u-row-between">
							<text class="title">通知公告</text>
							<text
								class="u-font-24">{{msgInfo.noticeDate||$u.timeFormat(new Date, 'mm-dd hh:MM')}}</text>
						</view>
						<view class="reply-item-cell u-flex u-row-between">
							<text class="">{{msgInfo.noticeText}}</text>
							<u-badge type="error" :count="msgInfo.noticeCount" :absolute="false"
								v-if="msgInfo.noticeCount" />
						</view>
					</view>
				</view>
				<view class="reply-item u-border-bottom u-flex" @click="openPage('/pages/message/sysMsg/index')">
					<view class="reply-item-img reply-item-icon u-flex u-row-center">
						<text class="icon-ym icon-ym-xitong" />
					</view>
					<view class="reply-item-txt u-flex-1">
						<view class="reply-item-cell reply-item-title u-flex u-row-between">
							<text class="title">系统消息</text>
							<text
								class="u-font-24">{{msgInfo.messageDate||$u.timeFormat(new Date, 'mm-dd hh:MM')}}</text>
						</view>
						<view class="reply-item-cell u-flex u-row-between">
							<text class="">{{msgInfo.messageText}}</text>
							<u-badge type="error" :count="msgInfo.messageCount" :absolute="false"
								v-if="msgInfo.messageCount" />
						</view>
					</view>
				</view>
				<view class="reply-item u-border-bottom u-flex" v-for="(item,i) in list" :key="i" @click="toIm(item)">
					<view class="reply-item-img">
						<u-avatar :src="define.baseURL+item.headIcon" mode="square" size="96" />
					</view>
					<view class="reply-item-txt u-flex-1">
						<view class="reply-item-cell reply-item-title u-flex u-row-between">
							<text class="title">{{item.realName}}/{{item.account}}</text>
							<text class="u-font-24">{{item.latestDate|timeFrom}}</text>
						</view>
						<view class="reply-item-cell u-flex u-row-between">
							<text class="">{{getMsgText(item.latestMessage,item.messageType)}}</text>
							<u-badge type="error" :count="item.unreadMessage" :absolute="false" />
						</view>
					</view>
				</view>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import chat from '@/libs/chat.js'
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import {
		mapGetters
	} from "vuex"
	import {
		getIMReply
	} from '@/api/message.js'
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				keyword: '',
				list: [],
				upOption: {
					use: true,
					empty: {
						use: false,
					},
				},
			}
		},
		computed: {
			...mapGetters(['msgInfo']),
		},
		onLoad() {
			if (!this.$store.state.chat.socket) chat.initSocket()
			this.$store.dispatch('user/getUserInfo')
			this.eventHub.$on('updateList', data => {
				this.updateReply(data)
			})
		},
		onUnload() {
			this.eventHub.$off('updateList')
			this.eventHub.$off('updateMsgNum')
		},
		methods: {
			upCallback(page) {
				getIMReply().then(res => {
					this.list = res.data.list;
					this.mescroll.endSuccess(res.data.list.length, false);
				}).catch(() => {
					this.mescroll.endErr();
				})
			},
			search() {
				return
				this.searchTimer && clearTimeout(this.searchTimer)
				this.searchTimer = setTimeout(() => {
					this.list = [];
					this.mescroll.resetUpScroll();
				}, 300)
			},
			updateReply(data) {
				let boo = false
				const len = this.list.length
				for (let i = 0; i < len; i++) {
					if (data.id === this.list[i].id) {
						this.list[i].unreadMessage += data.unreadMessage
						this.list[i].latestMessage = data.latestMessage
						this.list[i].messageType = data.messageType
						this.list[i].latestDate = data.latestDate
						boo = true
						break
					}
				}
				if (boo) return
				data.unreadMessage = data.unreadMessage
				this.list.unshift(data)
			},
			getMsgText(text, type) {
				let message = ''
				switch (type) {
					case 'voice':
						message = '[语音]'
						break;
					case 'image':
						message = '[图片]'
						break;
					default:
						message = text
						break;
				}
				return message
			},
			openPage(path) {
				if (!path) return
				uni.navigateTo({
					url: path
				})
			},
			toIm(item) {
				const name = item.realName + '/' + item.account
				if (item.unreadMessage) {
					this.$store.dispatch('chat/reduceBadgeNum', item.unreadMessage)
					item.unreadMessage = 0
				}
				uni.navigateTo({
					url: '/pages/message/im/index?name=' + name + '&formUserId=' + item.id + '&headIcon=' + item
						.headIcon
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f0f2f6;
	}

	.index-v {
		.head-tabs {
			height: 104rpx;
			margin-top: -20rpx;

			.head-tabs-item {
				font-size: 28rpx;
				color: #666666;
				line-height: 40rpx;
			}
		}

		.replyList {
			padding: 0 32rpx;
			background-color: #fff;

			.reply-item {
				height: 132rpx;

				.reply-item-img {
					width: 96rpx;
					height: 96rpx;
					border-radius: 16rpx;
					overflow: hidden;
					margin-right: 16rpx;
				}

				.reply-item-icon {
					background-color: #3B87F7;

					.icon-ym {
						color: #fff;
						font-size: 50rpx;
					}
				}

				.reply-item-txt {

					.reply-item-cell {
						height: 40rpx;
						color: #C6C6C6;
						font-size: 28rpx;

						&.reply-item-title {
							height: 44rpx;
							margin-bottom: 4px;

							.title {
								font-size: 32rpx;
								color: #000000;
							}
						}
					}
				}
			}
		}
	}
</style>
