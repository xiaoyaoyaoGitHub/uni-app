import Vue from 'vue'
import define from '@/utils/define'
import store from '@/store'

const $u = Vue.prototype.$u

const Socket = {
	contime: 0,
	ws: null,
	initSocket() {
		try {
			Socket.ws = uni.connectSocket({
				url: define.webSocketUrl,
				success() {
					// console.log("websocket连接成功")
				},
			});
			store.state.chat.socket = Socket.ws

			uni.onSocketOpen(res => {
				const token = uni.getStorageSync('token') || ''
				Socket.contime = 0
				const msg = JSON.stringify({
					method: "OnConnection",
					token,
					mobileDevice: true
				});
				Socket.sendMsg(msg)
			});

			uni.onSocketError(res => {
				store.state.chat.socket = null
				setTimeout(() => {
					Socket.contime += 1
					if (Socket.contime <= 10) {
						if (Socket.contime >= 3) {
							$u.toast('IM通讯正在连接:' + '连接第' + Socket.contime + '次！稍后...')
						}
						Socket.reConnect();
					} else {
						$u.toast('IM通讯连接失败，联系服务器管理员')
					}
				}, 10)
			});

			uni.onSocketClose(res => {
				store.state.chat.socket = null
			});

			uni.onSocketMessage(res => {
				const data = JSON.parse(res.data)
				// console.log(data)

				switch (data.method) {
					case "initMessage": //初始化
						const showInfo = {
							noticeText: data.noticeDefaultText,
							messageText: data.messageDefaultText,
							messageCount: data.unreadMessageCount,
							noticeCount: data.unreadNoticeCount,
							noticeDate: $u.timeFormat(new Date, 'mm-dd hh:mm'),
							messageDate: $u.timeFormat(new Date, 'mm-dd hh:mm')
						}
						let badgeNum = data.unreadMessageCount + data.unreadNoticeCount
						for (let i = 0; i < data.unreadNums.length; i++) {
							badgeNum = badgeNum + data.unreadNums[i].UnreadNum
						}
						const recentlys = data.unreadNums.map(o => {
							let message = ''
							switch (unreadNums[i].defaultMessageType) {
								case 'text':
									message = unreadNums[i].defaultMessage;
									break;
								case 'voice':
									message = '[语音]'
									break;
								case 'image':
									message = '[图片]'
									break;
							}
							return {
								...o,
								message
							}
						})
						store.commit('chat/SET_RECENTLYS', recentlys)
						store.commit('chat/SET_BADGE_NUM', badgeNum)
						store.commit('chat/SET_SHOWINFO', showInfo)
						break;
					case "Online": //在线用户

						break;
					case "Offline": //离线用户

						break;
					case "sendMessage": //发送消息

						break;
					case "receiveMessage": //接收消息

						break;
					case "messageList": //消息列表

						break;
					case "messagePush": //消息推送

						break;
					case "logout":
						$u.toast('登录已过期')
						store.dispatch('user/resetToken').then(() => {
							uni.reLaunch({
								url: '/pages/login/index'
							})
						})
						break;
					default:
						break;
				}
			});
		} catch (e) {}
	},
	sendMsg(msg) {
		uni.sendSocketMessage({
			data: msg,
			fail: (e) => {
				Socket.reConnect()
			}
		})
	},
	//重连
	reConnect() {
		Socket.initSocket()
	},
};

export default Socket
