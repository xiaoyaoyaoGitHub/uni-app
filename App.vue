<script>
	import chat from '@/libs/chat.js'
	import {
		versionUpgrade
	} from '@/api/common.js'
	export default {
		onLaunch: function() {
			// #ifdef H5
			const token = uni.getStorageSync("token");
			if (!token) return
			chat.initSocket()
			// #endif
			//#ifdef APP-PLUS  
			// let appName = this.define.version;
			// let javaApk = 'https://cdn.cudtsoft.com/apk/java-Android3.2.1.apk';
			// let dotNetApk = 'https://cdn.cudtsoft.com/apk/NET-Android3.2.1.apk';
			// plus.runtime.getProperty(plus.runtime.appid, (wgtinfo) => {
			// 	// let version = wgtinfo.version
			// 	let devLanguage = wgtinfo.name.toLowerCase().includes('java');
			// 	versionUpgrade(appName).then(res => {
			// 		let AppVersion = res.data.AppVersion ? res.data.AppVersion : '';
			// 		if (AppVersion == '' || AppVersion === appName) return;
			// 		uni.showModal({ //提醒用户更新
			// 			title: "立即更新版本",
			// 			success: (res) => {
			// 				if (res.confirm) {
			// 					let system = plus.os.name;
			// 					if (system === 'Android') {
			// 						let url = devLanguage ? javaApk : dotNetApk;
			// 						plus.runtime.openURL(url)
			// 						// uni.downloadFile({
			// 						// 	//下载地址
			// 						// 	url: url,
			// 						// 	success: data => {
			// 						// 		console.log(data)
			// 						// 		if (data.statusCode === 200) {
			// 						// 			plus.runtime.install(data
			// 						// 				.tempFilePath, {
			// 						// 					force: false
			// 						// 				},
			// 						// 				function() {
			// 						// 					plus.runtime
			// 						// 						.restart();
			// 						// 				});
			// 						// 		}
			// 						// 	}
			// 						// })
			// 					} else {
			// 						let appleId = devLanguage ? 1490797314 : 1563667378;
			// 						plus.runtime.launchApplication({
			// 							action: `itms-apps://itunes.apple.com/cn/app/id${appleId}`
			// 						}, function(e) {});
			// 					}
			// 				}
			// 			}
			// 		})
			// 	})
			// })
			//#endif  
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
