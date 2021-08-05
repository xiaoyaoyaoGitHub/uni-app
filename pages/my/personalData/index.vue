<template>
	<view class="personalData-v">
		<u-cell-group>
			<u-cell-item title="头像" :arrow="false">
				<u-avatar :src="baseURL+userInfo.headIcon" size="64" slot="right-icon"></u-avatar>
			</u-cell-item>
			<u-cell-item title="姓名" :value="userInfo.userName" :arrow="false"></u-cell-item>
			<u-cell-item title="性别" :value="gender" :arrow="false"></u-cell-item>
			<u-cell-item title="生日" :value="birthday" :arrow="false"></u-cell-item>
			<u-cell-item title="手机号" :value="userInfo.mobilePhone" :arrow="false"></u-cell-item>
			<u-cell-item title="邮箱" :value="userInfo.email" :arrow="false"></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				gender: '',
				birthday: '',
				userInfo: {}
			}
		},
		computed: {
			baseURL() {
				return this.define.baseURL
			}
		},
		onLoad() {
			this.userInfo = uni.getStorageSync('userInfo') || {};
			this.gender = this.userInfo.gender == 1 ? '男' : this.userInfo.gender == 2 ? '女' : '保密'
			this.birthday = this.userInfo.birthday ? this.$u.timeFormat(this.userInfo.birthday, 'yyyy-mm-dd') : ''
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #f0f2f6;
	}
</style>
