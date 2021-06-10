import Vue from 'vue'

const state = {
	socket: null,
	badgeNum: 0,
	msgInfo: {},
	formUserId: '',
};
const mutations = {
	SET_BADGE_NUM(state, badgeNum) {
		state.badgeNum = badgeNum
	},
	ADD_BADGE_NUM(state, num) {
		state.badgeNum += num
	},
	REDUCE_BADGE_NUM(state, num) {
		let badgeNum = state.badgeNum - num
		if (badgeNum < 0) badgeNum = 0
		state.badgeNum = badgeNum
	},
	SET_MSGINFO(state, msgInfo) {
		state.msgInfo = msgInfo
	},
	SET_FORMUSERID(state, formUserId) {
		state.formUserId = formUserId
	},
};
const actions = {
	sendMessage({
		state,
		commit
	}, data) {
		const item = {
			account: data.toAccount,
			headIcon: data.toHeadIcon,
			id: data.toUserId,
			latestDate: data.latestDate,
			latestMessage: data.toMessage,
			messageType: data.messageType,
			realName: data.toRealName,
			unreadMessage: 0
		}
		const addItem = {
			sendUserId: data.UserId,
			contentType: data.messageType,
			content: data.toMessage,
			sendTime: data.dateTime,
			method: data.method
		}
		Vue.prototype.eventHub && Vue.prototype.eventHub.$emit('addMsg', addItem)
		Vue.prototype.eventHub && Vue.prototype.eventHub.$emit('updateList', item)
	},
	receiveMessage({
		state,
		commit
	}, data) {
		if (state.formUserId === data.formUserId) {
			data.unreadMessage = 0
			const item = {
				sendUserId: data.formUserId,
				contentType: data.messageType,
				content: data.formMessage,
				sendTime: data.dateTime,
				method: data.method
			}
			Vue.prototype.eventHub && Vue.prototype.eventHub.$emit('addMsg', item)
		} else {
			data.unreadMessage = 1
			commit('ADD_BADGE_NUM', 1)
		}
		data.id = data.formUserId
		data.latestMessage = data.formMessage
		Vue.prototype.eventHub && Vue.prototype.eventHub.$emit('updateList', data)
	},
	getMessageList({
		state,
		commit
	}, data) {
		Vue.prototype.eventHub && Vue.prototype.eventHub.$emit('getMessageList', data)
	}
}
export default {
	namespaced: true,
	state,
	mutations,
	actions
}
