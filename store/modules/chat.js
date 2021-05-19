const state = {
	socket: null,
	badgeNum: 0,
	showInfo: {},
	recentlys:[],

	onlineUsers: [], //在线列表
	unreadNums: [], //未读
	online: '', //上线用户
	offline: '', //离线
	sendMessage: [], //发送消息
	receiveMessage: [], //接收消息
	hisMessage: [], //历史消息
	isread: false, //未读
	reParam: {}, //分页初始化
	paramMessage: [], //分页数据

	messageList: null,
	noticeMsgDef: {},
};
const mutations = {
	SET_BADGE_NUM(state, badgeNum) {
		state.badgeNum = badgeNum
	},
	SET_SHOWINFO(state, showInfo) {
		state.showInfo = showInfo
	},
	SET_RECENTLYS(state, recentlys) {
		state.recentlys = recentlys
	},
};
export default {
	namespaced: true,
	state,
	mutations,
}
