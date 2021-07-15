<template>
	<view class="business-v">
		<u-cell-group>
			<u-cell-item title="公司" :value="userInfo.organizeName" :arrow="false"></u-cell-item>
			<u-cell-item title="部门" :value="userInfo.departmentName" :arrow="false"></u-cell-item>
			<u-cell-item title="岗位" :value="positionIds" :arrow="false"></u-cell-item>
			<u-cell-item title="角色" :value="userInfo.roleName" :arrow="false"></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {},
				positionIds: ''
			}
		},
		onLoad() {
			this.userInfo = uni.getStorageSync('userInfo') || {};
			this.positionIds = this.userInfo.positionIds && this.userInfo.positionIds.length > 0 ? this.userInfo.positionIds[0].name : '';
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f0f2f6;
	}
</style>
