<template>
	<view class="my-v">
		<uni-list>
			<uni-list-item class="list-item">
				<template slot="header">
					<view class="label">
						账户
					</view>
				</template>
				<template slot="body">
					<view class="desc">
						{{userInfo.userName}}
					</view>
				</template>
			</uni-list-item>
			<uni-list-item class="list-item">
				<template slot="header">
					<view class="label">
						组织
					</view>
				</template>
				<template slot="body">
					<view class="desc">
						{{userInfo.organizeName}}
					</view>
				</template>
			</uni-list-item>
			<uni-list-item class="list-item">
				<template slot="header">
					<view class="label">
						部门
					</view>
				</template>
				<template slot="body">
					<view class="desc">
						{{userInfo.departmentName}}
					</view>
				</template>
			</uni-list-item>
			<uni-list-item class="list-item">
				<template slot="header">
					<view class="label">
						岗位
					</view>
				</template>
				<template slot="body">
					<view class="desc">
						{{userInfo.roleName}}
					</view>
				</template>
			</uni-list-item>
			<uni-list-item class="list-item">
				<template slot="header">
					<view class="label">
						直属领导
					</view>
				</template>
				<template slot="body">
					<view class="desc">
						{{userInfo.roleName}}
					</view>
				</template>
			</uni-list-item>
			<uni-list-item class="list-item">
				<template slot="header">
					<view class="label">
						角色
					</view>
				</template>
				<template slot="body">
					<view class="desc">
						{{userInfo.roleName}}
					</view>
				</template>
			</uni-list-item>
			<uni-list-item class="list-item">
				<template slot="header">
					<view class="label">
						注册时间
					</view>
				</template>
				<template slot="body">
					<view class="desc">
						<!-- admin2345 -->
					</view>
				</template>
			</uni-list-item>
			<uni-list-item class="list-item">
				<template slot="header">
					<view class="label">
						上次登录时间
					</view>
				</template>
				<template slot="body">
					<view class="desc">
						<!-- admin2345 -->
					</view>
				</template>
			</uni-list-item>
			<uni-list-item class="list-item">
				<template slot="header">
					<view class="label">
						入职时间
					</view>
				</template>
				<template slot="body">
					<view class="desc">
						<!-- admin2345 -->
					</view>
				</template>
			</uni-list-item>
		</uni-list>
		<u-button class="btn" @click="logout" border="none">
			退出登录
		</u-button>

		<!-- <view class="u-flex user-box u-p-l-32 u-p-r-22 u-p-b-30" @click="openPage('/pages/my/personalData/index')">
			<view class="u-m-r-20">
				<u-avatar :src="baseURL+userInfo.headIcon" size="140"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">{{userInfo.userName}}/{{userInfo.userAccount}}</view>
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
			</view>
		</view>
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item title="企业组织" @click="openPage('/pages/my/business/index')">
					<text class="icon-ym icon-ym-zuzhi u-m-r-16 u-font-36" slot="icon" />
				</u-cell-item>
			</u-cell-group>
		</view>
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item title="联系我们" @click="openPage('/pages/my/contactUs/index')">
					<text class="icon-ym icon-ym-lianxi u-m-r-16 u-font-36" slot="icon" />
				</u-cell-item>
			</u-cell-group>
		</view> -->
		<!-- #ifdef APP-NVUE -->
		<!-- <view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item title="账号安全" @click="openPage('/pages/my/accountSecurity/index')">
					<text class="icon-ym icon-ym-zhanghao u-m-r-16 u-font-36" slot="icon" />
				</u-cell-item>
			</u-cell-group>
		</view> -->
		<!-- #endif -->
		<!-- <view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item title="设置" @click="openPage('/pages/my/settings/index')">
					<text class="icon-ym icon-ym-shezhi u-m-r-16 u-font-36" slot="icon" />
				</u-cell-item>
			</u-cell-group>
		</view> -->
	</view>
</template>

<script>
	import {
		logout
	} from "@/api/common.js"
	import IndexMixin from './mixin.js'
	export default {
		mixins: [IndexMixin],
		data() {
			return {
				userInfo: {}
			}
		},
		computed: {
			baseURL() {
				return this.define.baseURL
			}
		},
		onLoad() {
			this.userInfo = uni.getStorageSync('userInfo') || {}
		},
		methods: {
			logout() {
				uni.showModal({
					title: '提示',
					content: '确定退出吗',
					success: function(res) {
						if (res.confirm) {
							// console.log('用户点击确定');
							logout().then(res => {
								uni.redirectTo({
									url: '/pages/login/index'
								})
							})

						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
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

		.my-v {
			.list-item {
				.label {
					width: 220rpx;
					font-size: 28rpx;
					line-height: 48rpx;
					color: #5E6472;
				}

				.desc {
					font-size: 32rpx;
					line-height: 48rpx;
					color: #071127;
				}
			}

			.btn {

				border: none;
				color: #0060F4;
				margin-top: 20rpx;
				font-size: 32rpx;
				line-height: 48rpx;
				height: 96rpx;

				&:after {
					border-color: transparent;
				}
			}
		}
	}
</style>
