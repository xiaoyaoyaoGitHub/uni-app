<template>
	<view class="apply-v">
		<view class="banner">
			<u-swiper :list="bannerList" height="300"></u-swiper>
		</view>
		<u-notice-bar :list="['你好朋友，感谢使用JNPF快速开发平台新版本']" type="none"></u-notice-bar>
	</view>
</template>

<script>
	import resources from '@/libs/resources.js'
	export default {
		data() {
			return {
				bannerList: [{
						image: resources.banner.home1Url,
					},
					{
						image: resources.banner.home2Url,
					},
					{
						image: resources.banner.home3Url,
					}
				]
			};
		},
		methods: {}
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
	}
</style>
