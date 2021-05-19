<template>
	<view class="my-v">
		<view class="u-flex user-box u-p-l-32 u-p-r-22 u-p-b-30">
			<view class="u-m-r-10">
				<u-avatar :src="define.baseURL+userInfo.headIcon" size="140"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">{{userInfo.userName}}/{{userInfo.userAccount}}</view>
				<view class="u-font-14 u-tips-color">{{userInfo.organizeName}}</view>
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
			</view>
		</view>
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="star" title="企业组织" @click="openPage()"></u-cell-item>
				<u-cell-item icon="photo" title="账号安全" @click="openPage()"></u-cell-item>
				<u-cell-item icon="coupon" title="联系我们" @click="openPage()"></u-cell-item>
				<u-cell-item icon="heart" title="应用介绍" @click="openPage()"></u-cell-item>
			</u-cell-group>
		</view>
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="setting" title="设置" @click="openPage('/pages/my/settings/index')"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {}
			}
		},
		onLoad() {
			this.userInfo = uni.getStorageSync('userInfo') || {}
		},
		methods: {
			openPage(path) {
				if (!path) return
				uni.navigateTo({
					url: path
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f0f2f6;
	}

	.user-box {
		background-color: #fff;
	}
</style>
