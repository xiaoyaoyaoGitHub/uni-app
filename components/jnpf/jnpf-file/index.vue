<template>
	<view class="jnpf-file">
		<view @click='downLoad(item)' v-for='(item,index) in list' :key="index"
			class="jnpf-file-item u-type-primary u-line-1">
			{{item.name}}
		</view>
	</view>
</template>

<script>
	import {
		getDownloadUrl
	} from '@/api/common'
	export default {
		props: {
			list: {
				type: Array,
				default: () => ([])
			},
		},
		methods: {
			downLoad(item) {
				// #ifdef MP
				uni.navigateTo({
					url: `/pages/workFlow/filePreview/index??fileId=${item.fileId}&name=${item.name}`
				})
				// #endif
				// #ifndef MP
				getDownloadUrl('workFlow', item.fileId).then(res => {
					const fileUrl = this.define.baseURL + res.data.url;
					// #ifdef H5
					window.location.href = fileUrl;
					// #endif
					// #ifdef APP-PLUS
					this.downloadFile(res.data.url);
					// #endif
				})
				// #endif
			},
			downloadFile(url) {
				uni.downloadFile({
					url: baseUrl + url,
					success: res => {
						const filePath = res.tempFilePath;
						uni.openDocument({
							filePath: filePath,
							success: res => {
								
							}
						});
					}
				});
			},
		}
	}
</script>
<style lang="scss" scoped>
	.jnpf-file {
		.jnpf-file-item {
			width: 500rpx;
			line-height: 60rpx;
		}
	}
</style>
