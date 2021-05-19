<template>
	<view class="settings-v">
		<u-cell-group>
			<u-cell-item title="退出登录"></u-cell-item>
		</u-cell-group>
		<view class="logout-cell" hover-class="u-cell-hover" @click="logout">退出登录</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

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
			}
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
