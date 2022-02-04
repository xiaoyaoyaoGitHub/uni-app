<template>
	<view class="messageDetail-v u-p-l-32 u-p-r-32">
		<view class="u-flex-col u-p-t-10 u-p-b-10 u-border-bottom">
			<text class="u-m-b-10 u-font-32">{{info.title}}</text>
			<text class="releaseUser u-m-t-10 u-font-24 u-p-b-10">{{info.creatorUser}}</text>
		</view>
		<view class="messageDetail-content u-p-t-20 u-p-b-20">
			<u-parse :html="info.bodyText" selectable :tag-style="style"></u-parse>
		</view>
	</view>
</template>

<script>
	import {
		getMessageDetail
	} from '@/api/message.js'
	export default {
		data() {
			return {
				info: {},
				style: {
					ul: 'padding:0',
					li: 'list-style-type:none,padding:0'
				}
			}
		},
		onLoad(option) {
			this.initDetail(option.id)
		},
		methods: {
			initDetail(id) {
				getMessageDetail(id).then(res => {
					uni.setNavigationBarTitle({
						title: res.data.title
					});
					this.info = res.data;
				})
			}
		}
	}
</script>

<style lang="scss">
	.messageDetail-v {
		.releaseUser {
			color: #9A9A9A;
		}
	}
</style>
