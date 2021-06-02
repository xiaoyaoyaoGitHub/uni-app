<template>
	<view class="business-v">
		<view class="business-list">
			<u-cell-group>
				<u-cell-item title="公司" :arrow="false">{{userInfo.organizeName}}</u-cell-item>
				<u-cell-item title="部门" :arrow="false">{{userInfo.departmentName}}</u-cell-item>
				<u-cell-item title="岗位" :arrow="false">{{positionIds}}</u-cell-item>
				<u-cell-item title="角色" :arrow="false"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {},
				positionIds:''
			}
		},
		onLoad() {
			this.userInfo = uni.getStorageSync('userInfo') || {};
			this.positionIds = this.userInfo.positionIds.length > 0 ? this.userInfo.positionIds[0].name : '';
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f0f2f6;
	}

	.business-v {
		.business-list {}
	}
</style>
