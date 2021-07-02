<template>
	<view class="apply-v">
		<view class="banner">
			<u-swiper :list="bannerList" height="300"></u-swiper>
		</view>
		<u-notice-bar :list="['你好朋友，感谢使用JNPF快速开发平台新版本']" type="none"></u-notice-bar>

		<view class="u-flex-col u-m-t-24 u-p-l-16">
			<!-- <navigator :url="'/pages/navigate/navigate?item='+ encodeURIComponent(JSON.stringify(item))"></navigator> -->
			<navigator url="/pages/apply/reportLog/index" class="u-m-b-20">
				<text>汇报日志</text>
			</navigator>
			<navigator url="/pages/apply/schedule/index" class="u-m-b-20">
				<text>我的日程</text>
			</navigator>
			<navigator url="/pages/apply/fieldPunchCard/index" class="u-m-b-20">
				<text>外勤打卡</text>
			</navigator>
			<navigator url="/pages/apply/features/index?id=fda7b796317a4cf280890288ee7bb916"><text>领用申请</text>
			</navigator>
			<navigator url="/pages/apply/staffInformation/index"><text>职员示例</text>
			</navigator>
		</view>
	</view>
</template>

<script>
	import resources from '@/libs/resources.js'
	import IndexMixin from './mixin.js'
	export default {
		mixins: [IndexMixin],
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
