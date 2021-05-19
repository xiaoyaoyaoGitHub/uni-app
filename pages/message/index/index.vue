<template>
	<view class="container">
		<u-button @click="toForm()">form</u-button>
	</view>
</template>

<script>
	import {
		getDictionaryDataAll
	} from '@/api/common.js'
	export default {
		data() {
			return {
			}
		},
		onLoad() {
		},
		methods: {
			toForm() {
				uni.navigateTo({
					url:'/pages/form/index'
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
