<template>
	<view class="cudt-group" :style="{'text-align':contentPosition}">{{content}}</view>
</template>
<script>
	export default {
		name: 'cudt-group',
		props: {
			content: {
				type: String,
				default: ''
			},
			'content-position': {
				type: String,
				default: 'left'
			},
		}
	}
</script>
<style lang="scss" scoped>
	.cudt-group {
		width: 100%;
		color: #333333;
		font-size: 32rpx;
		line-height: 70rpx;
		margin: 0;
		padding: 0 32rpx;
	}
</style>
