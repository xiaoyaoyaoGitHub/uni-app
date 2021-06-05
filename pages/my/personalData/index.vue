<template>
	<view class="personalData-v">
		<u-cell-group>
			<u-cell-item title="头像" :arrow="false">
				<u-avatar :src="define.baseURL+userInfo.headIcon" size="64" slot="right-icon"></u-avatar>
			</u-cell-item>
			<u-cell-item title="姓名" :value="userInfo.userName" :arrow="false"></u-cell-item>
			<u-cell-item title="性别" :value="userInfo.gender == 0 ? '女' : '男'" :arrow="false"></u-cell-item>
			<u-cell-item title="生日" :value="'2021-04-24'" :arrow="false">2021-04-24</u-cell-item>
			<u-cell-item title="手机号" :value="userInfo.mobilePhone" :arrow="false"></u-cell-item>
			<u-cell-item title="邮箱" :value="userInfo.email" :arrow="false"></u-cell-item>
		</u-cell-group>
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
			this.userInfo = uni.getStorageSync('userInfo') || {};
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #f0f2f6;
	}
</style>
