<template>
	<view class="guide-v">
		<view class="status-bar">
			<view class="top-view"></view>
		</view>
		<view class="content">
			<swiper class="swiper" @change="onChange">
				<swiper-item>
					<view class="swiper-item">
						<view class="swiper-item-text">
							<view class="swiper-item-title">版本新升级</view>
							<view class="swiper-item-content">降低成本，提高质量</view>
						</view>
						<view class="swiper-item-img">
							<image class="itemImg" :src="guide1" mode="aspectFit"></image>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<view class="swiper-item-text">
							<view class="swiper-item-title">服务新入口</view>
							<view class="swiper-item-content">零代码/低代码个性化开发</view>
						</view>
						<view class="swiper-item-img">
							<image class="itemImg" :src="guide2" mode="aspectFit"></image>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<view class="swiper-item-text">
							<view class="swiper-item-title">采用新技术</view>
							<view class="swiper-item-content">控制开发成本，解决团队困难</view>
						</view>
						<view class="swiper-item-img">
							<image class="itemImg" :src="guide3" mode="aspectFit"></image>
						</view>
						<view class="swiper-item-btn">
							<u-button type="primary" shape="circle" @click="setLaunchFlag()">立即开启</u-button>
						</view>
					</view>
				</swiper-item>
			</swiper>
			<view class="jump-over" @click="setLaunchFlag()">
				<u-icon name="arrow-right" label="跳过" label-pos="left" label-size="32" color="#606266"></u-icon>
			</view>
			<view class="bannerDots" v-if="currenTab!=3">
				<view class="banner-dot" v-for="(item,index) in bannerDot" :key="index"
					:class="{'active':index===currenTab}">
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import resources from '@/libs/resources.js'
	export default {
		data() {
			return {
				bannerDot: [0, 1, 2],
				currenTab: 0,
				guide1: resources.guide.guide1,
				guide2: resources.guide.guide2,
				guide3: resources.guide.guide3
			}
		},
		methods: {
			setLaunchFlag() {
				uni.setStorageSync('launchFlag', true)
				uni.reLaunch({
					url: '/pages/login/index'
				})
			},
			onChange(e) {
				this.currenTab = e.detail.current
			},
		}
	}
</script>
<style lang="scss">
	page {
		width: 100%;
		height: 100%;
	}

	.guide-v {
		width: 100%;
		height: 100%;

		.status-bar {
			height: var(--status-bar-height);
			width: 100%;
			background-color: #FFFFFF;

			.top-view {
				height: var(--status-bar-height);
				width: 100%;
				position: fixed;
				background-color: #FFFFFF;
				top: 0;
				z-index: 999;
			}
		}

		.content {
			width: 100%;
			height: 100%;
			background-size: 100% auto;
			padding: 0;
			touch-action: none;
			position: fixed;
		}

		.swiper {
			width: 100%;
			height: 100% !important;
			background: #FFFFFF;
		}

		.itemImg {
			width: 554rpx;
		}

		.swiper-item {
			width: 100%;
			text-align: center;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}

		.swiper-item-img {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			/* #ifndef APP-PLUS */
			padding-top: 4.6vh
				/* #endif */
		}

		/* #ifdef APP-PLUS */
		.swiper-item-img {
			padding-top: 13.49vh
		}

		/* #endif */
		.swiper-item-text {
			padding-top: 7.5vh;
		}

		.swiper-item-title {
			line-height: 2em;
			font-size: 48upx;
			color: $u-type-primary;
			font-weight: 500;
		}

		.swiper-item-content {
			font-size: 34upx;
			color: #999999;
			padding-top: 2.2vh;
		}

		.bannerDots {
			width: 100%;
			height: 16rpx;
			display: flex;
			position: fixed;
			bottom: 8%;
			z-index: 99;
			left: 50%;
			transform: translate(-50%);
			align-items: center;
			justify-content: center;

			.banner-dot {
				width: 16rpx;
				height: 16rpx;
				border-radius: 50%;
				background: #CACACA;
				margin: 0 10rpx;

				&.active {
					width: 40rpx;
					height: 16rpx;
					background: $u-type-primary;
					border-radius: 8rpx;
				}
			}
		}

		.jump-over {
			position: absolute;
			z-index: 999;
			right: 32rpx;
			top: 20rpx;
		}

		.swiper-item-btn {
			margin-top: 8.2vh;
			width: 260rpx;
			z-index: 100;
		}
	}
</style>
