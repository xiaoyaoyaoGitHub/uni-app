<template>
	<view class="launch-v">
		<!-- #ifdef APP-PLUS -->
		<view class="launch-box">
			<view class="u-flex u-col-top u-row-between">
				<image :src="startup.topLeft" class="launch-img" mode="widthFix"></image>
				<image :src="startup.topRight" class="launch-img" mode="widthFix"></image>
			</view>
			<view class="u-flex u-row-center">
				<image :src="startup.main" class="launch-img" mode="widthFix"></image>
			</view>
			<view class="launch-logo u-flex u-row-center">
				<image :src="loginlogo.logo" class="launch-img" mode="widthFix"></image>
			</view>
			<view class="launch-foot">
				<image :src="startup.bottomRight" class="launch-img" mode="widthFix"></image>
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	import resources from '@/libs/resources.js'
	export default {
		data() {
			return {
				startup: resources.startup,
				loginlogo: resources.login
			}
		},
		onLoad() {
			const launchFlag = uni.getStorageSync('launchFlag');
			const token = uni.getStorageSync("token") || '';
			if (launchFlag) {
				if (token) {
					uni.switchTab({
						url: '/pages/index/index'
					})
				} else {
					uni.redirectTo({
						url: '/pages/login/index'
					})
				}
			} else {
				// #ifdef APP-PLUS
				uni.redirectTo({
					url: '/pages/launch/policy'
				})
				// #endif
				// #ifndef APP-PLUS
				if (token) {
					uni.switchTab({
						url: '/pages/index/index'
					})
				} else {
					uni.redirectTo({
						url: '/pages/login/index'
					})
				}
				// #endif
			}
		},
	}
</script>

<style lang="scss">
	.launch-v {
		.launch-box {
			.launch-img {
				width: 164rpx;
			}

			.launch-logo {
				position: fixed;
				width: 100%;
				bottom: 240rpx;
				right: 0;
			}

			.launch-foot {
				position: fixed;
				bottom: -10rpx;
				right: 0;
			}
		}
	}
</style>
