<template>
	<view class="my-v">
		<view class="u-flex user-box u-p-l-32 u-p-r-22 u-p-b-30" @click="openPage('/pages/my/personalData/index')">
			<view class="u-m-r-20">
				<u-avatar :src="baseURL+userInfo.headIcon" size="140"></u-avatar>
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
				<u-cell-item title="企业组织" @click="openPage('/pages/my/business/index')">
					<text class="icon-ym icon-ym-zuzhi u-m-r-16 u-font-36 u-type-primary" slot="icon" />
				</u-cell-item>
			</u-cell-group>
		</view>
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item title="联系我们" @click="openPage('/pages/my/contactUs/index')">
					<text class="icon-ym icon-ym-lianxi u-m-r-16 u-font-36 u-type-primary" slot="icon" />
				</u-cell-item>
				<u-cell-item title="应用介绍" @click="openPage('/pages/my/abouts/index')">
					<text class="icon-ym icon-ym-yingyong u-m-r-16 u-font-36 u-type-success" slot="icon" />
				</u-cell-item>
			</u-cell-group>
		</view>
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item title="账号安全" @click="openPage('/pages/my/accountSecurity/index')">
					<text class="icon-ym icon-ym-zhanghao u-m-r-16 u-font-36 u-type-warning" slot="icon" />
				</u-cell-item>
			</u-cell-group>
		</view>
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item title="设置" @click="openPage('/pages/my/settings/index')">
					<text class="icon-ym icon-ym-shezhi u-m-r-16 u-font-36 u-type-primary" slot="icon" />
				</u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
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

	.my-v {
		.user-box {
			background-color: #fff;
		}
	}
</style>
