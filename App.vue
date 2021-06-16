<script>
	import chat from '@/libs/chat.js'
	export default {
		onLaunch: function() {
			// #ifdef H5
			const token = uni.getStorageSync("token");
			if (!token) return
			chat.initSocket()
			// #endif
		},
		onShow: function() {
			
		},
		onHide: function() {
			
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
