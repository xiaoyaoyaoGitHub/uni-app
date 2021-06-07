<script>
	import chat from '@/libs/chat.js'
	export default {
		onLaunch: function() {
			const token = uni.getStorageSync("token") || '';
			if (!token) {
				uni.reLaunch({
					url: '/pages/login/index'
				})
			} else {
				chat.initSocket()
			}
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "@/uview-ui/index.scss";
	@import "@/assets/iconfont/ym/iconfont.css";
	@import "@/assets/iconfont/custom/iconfont.css";
	@import "@/assets/scss/common.scss";
</style>
