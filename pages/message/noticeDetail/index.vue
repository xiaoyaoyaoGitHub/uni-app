<template>
	<view class="noticeDetail-v u-p-l-16 u-p-r-16">
		<view class="noticeDetail-hd u-flex-col u-p-t-10 u-p-b-10">
			<text class="title u-m-b-10 u-font-32">{{infoData.title}}</text>
			<text class="releaseUser u-m-t-10 u-font-24">{{infoData.creatorUser}}</text>
		</view>
		<view class="noticeDetail-content u-p-t-20 u-p-b-20">
			<u-parse :html="infoData.bodyText" :selectable="true" :tag-style="style"></u-parse>
		</view>
	</view>
</template>

<script>
	import {
		getNoticeDetail
	} from '@/api/message.js'
	export default {
		data() {
			return {
				infoData: {
					bodyText: '',
					creatorUser: '',
					id: '',
					lastModifyTime: '',
					title: ''
				},
				style:{
					ul:'padding:0',
					li:'list-style-type:none,padding:0'
				}
			}
		},
		onLoad(url) {
			console.log(url)
			let notifyid = url.notifyid
			this.initDetail(notifyid)

		},
		methods: {
			initDetail(notifyid) {
				getNoticeDetail(notifyid).then(res => {
					uni.setNavigationBarTitle({
						title: res.data.title
					});
					this.infoData.bodyText = res.data.bodyText;
					this.infoData.creatorUser = res.data.creatorUser;
					this.infoData.id = res.data.id;
					this.infoData.lastModifyTime = res.data.lastModifyTime;
					this.infoData.title = res.data.title;
					
				}).catch(() => {

				})
			}
		}
	}
</script>

<style lang="scss">
	page {}

	.noticeDetail-v {
		.noticeDetail-hd {
			border-bottom: 1px solid #ECECEC;

			.releaseUser {
				color: #9A9A9A;
			}
		}
	}
</style>
