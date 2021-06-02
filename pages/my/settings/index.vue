<template>
	<view class="settings-v">
		<u-cell-group>
			<!-- #ifdef APP-PLUS -->
			<u-cell-item title="用户协议" @click='openPage(agreement)'></u-cell-item>
			<u-cell-item title="隐私政策" @click='openPage(policy)'></u-cell-item>
			<!-- #endif -->
		</u-cell-group>
		<view class="logout-cell" hover-class="u-cell-hover" @click="logout">退出登录</view>
	</view>
</template>

<script>
	import request from '../../../libs/resources.js'
	export default {
		data() {
			return {
				// #ifdef APP-PLUS
				agreement: resources.userAgreement,
				policy: resources.privacyPolicy,
				// #endif
			};
		},
		methods: {
			logout() {
				uni.showModal({
					title: '提示',
					content: '确定退出当前账号吗？',
					success: res => {
						if (res.confirm) {
							this.$store.dispatch('user/logout').then(() => {
								uni.reLaunch({
									url: '/pages/login/index'
								})
							})
						}
					}
				})
			},
			// #ifdef APP-PLUS
			openPage(url) {
				plus.runtime.openURL(url);
			}
			// #endif
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f0f2f6;
	}

	.settings-v {
		.logout-cell {
			text-align: center;
			margin-top: 20rpx;
			font-size: 32rpx;
			line-height: 100rpx;
			background-color: #fff;
		}
	}
</style>
