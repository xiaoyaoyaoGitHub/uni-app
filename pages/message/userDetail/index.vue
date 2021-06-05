<template>
	<view class="userDetail-v">
		<view class="userDetail-hd u-flex-col">
			<view class="u-m-t-60">
				<u-avatar :src="userData.headIcon"></u-avatar>
			</view>
			<view class="u-m-t-32 u-font-32 name">
				<text>{{userData.realName}}</text>
			</view>
			<view class="u-m-t-20 u-font-24">
				<text>{{userData.position || '研发 产品经理'}}</text>
			</view>
			<view class="u-m-t-32 u-flex userDetail-hd-btn">
				<view class="u-m-r-40 btn" @click="Jump('1')"><text
						class="ym-custom ym-custom-phone u-font-40 tabs-icon copy" /></view>
				<view class="u-m-l-40 btn" @click="Jump('2')"><text
						class="ym-custom ym-custom-comment u-font-40 tabs-icon copy" /></view>
			</view>
			<u-cell-group class="u-m-t-50">
				<u-cell-item title="手机号" :value="userData.telePhone || '未填写'" :arrow="false" :title-style="titleStyle"></u-cell-item>
				<u-cell-item title="微信号" :value="'未填写'" :arrow="false" :title-style="titleStyle"></u-cell-item>
				<u-cell-item title="座机号" :value="'未填写'" :arrow="false" :title-style="titleStyle"></u-cell-item>
				<u-cell-item title="邮箱" :value="userData.email || '未填写'" :arrow="false" :title-style="titleStyle"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	import {
		getUesrDetail
	} from '@/api/common.js'
	export default {
		data() {
			return {
				userData: {},
				titleStyle:{
					color:'#999999'
				}
			}
		},
		onLoad(url) {
			let userId = url.userId;
			this.getUserDetail(userId)
		},

		methods: {
			getUserDetail(userId) {
				getUesrDetail(userId).then(res => {
					this.userData = res.data
				}).catch(() => {

				})
			},
			Jump(index) {
				switch (index) {
					case '1':
						uni.makePhoneCall({
							phoneNumber: this.userData.telePhone,
						})
						break;
					case '2':
						console.log(index)
						break;
				}
			},
		}
	}
</script>

<style lang="scss">
	page {}

	.userDetail-v {
		.userDetail-hd {
			width: 100%;
			height: 566rpx;
			background-color: #D8D8D8;
			color: #FFFFFF;
			align-items: center;
			
		}

		.name {
			font-weight: 700;
		}

		.userDetail-hd-btn {
			.btn {
				width: 84rpx;
				height: 84rpx;
				border: 2px solid #FFFFFF;
				border-radius: 50%;
				text-align: center;
				line-height: 80rpx;
			}
		}
	}
</style>
