<template>
	<view class="personalData-v">
		<view class="personalData-list">
			<u-cell-group>
				<u-cell-item title="头像" :arrow="false">
					<image :src="define.baseURL+userInfo.headIcon" mode="widthFix"></image>
				</u-cell-item>
				<u-cell-item title="姓名" :arrow="false"><text>{{userInfo.userName || userInfo.realName}}</text></u-cell-item>
				<u-cell-item title="性别" :arrow="false"><text>{{userInfo.gender == 0 ? '女' : '男'}}</text></u-cell-item>
				<u-cell-item title="生日" :arrow="false"><text>2021-04-24</text></u-cell-item>
				<u-cell-item title="手机号" :arrow="false"><text>{{userInfo.mobilePhone}}</text></u-cell-item>
				<u-cell-item title="邮箱" :arrow="false"><text>{{userInfo.email || '28381858@qq.com'}}</text></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	import define from '../../../utils/define.js'
	export default {
		data() {
			return {
				headerImg: 'http://192.168.0.18:7005/api/file/Image/userAvatar/213.jpg',
				userInfo:{}
			}
		},
		onLoad() {
			this.userInfo = uni.getStorageSync('userInfo') || {};
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f0f2f6;
	}

	.personalData-v {
		.personalData-list{
			image{
				width: 64rpx;
				height: 64rpx;
				border-radius: 50%;
			}
		}
	}
</style>
