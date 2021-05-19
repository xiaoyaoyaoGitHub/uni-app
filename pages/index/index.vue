<template>
	<view class="container">
		<view class="intro">首页</view>
		<u-button @click="toForm()">2112221</u-button>
		<text class="icon-ym icon-ym-generator-count u-m-l-30 u-font-40" />
	</view>
</template>

<script>
	import chat from '@/libs/chat.js'
	import {
		getDictionaryDataAll
	} from '@/api/common.js'
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			// chat.initSocket()
			// this.initData()
			this.$store.dispatch('user/getUserInfo')
		},
		methods: {
			initData() {
				getDictionaryDataAll().then(res => {
					console.log(res)
				})
			},
			toForm() {
				uni.navigateTo({
					url: '/pages/form/index'
				})
			}
		}
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
</style>
