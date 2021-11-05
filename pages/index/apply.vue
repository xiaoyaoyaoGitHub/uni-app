<template>
	<view class="apply-v">
		<mescroll-body ref="mescrollRef" @down="downCallback" :up="upOption" :bottombar="false">
			<view class="banner">
				<u-swiper :list="bannerList" height="300"></u-swiper>
			</view>
			<view class="notice-bar">
				<u-notice-bar :list="['你好朋友，感谢使用cudt快速开发平台新版本']" type="none"></u-notice-bar>
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
				<view class="part" v-for="(item,i) in menuList" :key="i">
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
		</mescroll-body>
	</view>
</template>

<script>
	import {
		getMenuList,
		getUsualList
	} from '@/api/apply/apply.js'
	import chat from '@/libs/chat.js'
	import resources from '@/libs/resources.js'
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js"
	import IndexMixin from './mixin.js'
	export default {
		mixins: [MescrollMixin, IndexMixin],
		data() {
			return {
				bannerList: [{
						image: resources.banner.home1Url,
					},
					{
						image: resources.banner.home2Url,
					},
					{
						image: resources.banner.home3Url
					}
				],
				usualList: [],
				menuList: [],
				upOption: {
					use: false
				}
			};
		},
		onLoad() {
			if (!this.$store.state.chat.socket) chat.initSocket()
			this.$store.dispatch('user/getCurrentUser')
			uni.$on('updateUsualList', data => {
				this.getUsualList()
			})
		},
		onUnload() {
			uni.$off('updateUsualList')
		},
		methods: {
			getUsualList() {
				getUsualList(2).then(res => {
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
				getMenuList().then(res => {
					let list = res.data.list
					for (let i = 0; i < list.length; i++) {
						let children = list[i].children
						if (Array.isArray(children) && children.length) {
							for (let j = 0; j < children.length; j++) {
								let iconBackground = '',
									moduleId = ''
								if (children[j].propertyJson) {
									let propertyJson = JSON.parse(children[j].propertyJson)
									iconBackground = propertyJson.iconBackgroundColor || ''
									moduleId = propertyJson.moduleId || ''
								}
								this.$set(children[j], 'iconBackground', iconBackground)
								this.$set(children[j], 'moduleId', moduleId)
							}
						}
					}
					this.menuList = list
					this.mescroll.endSuccess(list.length, false);
				}).catch(() => {
					this.mescroll.endErr();
				})
			},
			moreApp() {
				uni.navigateTo({
					url: '/pages/workFlow/allApp/index?type=2'
				})
			},
			handelClick(item) {
				if (item.type == 2) {
					uni.navigateTo({
						url: item.urlAddress,
						fail: (err) => {
							this.$u.toast("暂无此页面")
						}
					})
					return
				}
				if (item.type == 3) {
					if (!item.moduleId) {
						this.$u.toast("暂无此页面")
						return
					}
					uni.navigateTo({
						url: '/pages/apply/dynamicModel/index?id=' + item.moduleId + '&fullName=' + item.fullName,
						fail: (err) => {
							this.$u.toast("暂无此页面")
						}
					})
					return
				}
				if (item.type == 7) {
					if (!item.urlAddress) {
						this.$u.toast("暂无此页面")
						return
					}
					// #ifdef APP-PLUS
					plus.runtime.openURL(item.urlAddress);
					// #endif
					// #ifndef APP-PLUS
					uni.navigateTo({
						url: '/pages/apply/externalLink/index?url=' + encodeURIComponent(item.urlAddress) +
							'&fullName=' + item.fullName,
						fail: (err) => {
							this.$u.toast("暂无此页面")
						}
					})
					// #endif
					return
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f0f2f6;
	}

	.apply-v {
		.banner {
			padding: 20rpx;

			.u-indicator-item-round.u-indicator-item-round-active {
				background-color: $u-type-primary;
			}
		}

		.notice-bar {
			margin: 0 20rpx;
			background: #fff;
			border-radius: 8rpx;
		}

		.workFlow-list {
			padding: 20rpx 16rpx 0;

			.part {
				background: #fff;
				border-radius: 8rpx;
				margin-bottom: 20rpx;

				.caption {
					padding: 0 32rpx;
					font-size: 36rpx;
					line-height: 100rpx;
					font-weight: bold;
				}

				.item {
					margin-bottom: 32rpx;
					width: 25%;

					.item-icon {
						width: 88rpx;
						height: 88rpx;
						margin-bottom: 8rpx;
						line-height: 88rpx;
						text-align: center;
						border-radius: 20rpx;
						color: #fff;

						&.more {
							background: #ECECEC;
							color: #666666;
							font-size: 50rpx;
						}
					}

					.item-text {
						width: 100%;
						text-align: center;
						padding: 0 16rpx;
					}
				}
			}
		}
	}
</style>
