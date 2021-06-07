import Vue from 'vue'

const state = {
	socket: null,
	badgeNum: 0,
	msgInfo: {},
	formUserId: '',
};
const mutations = {
	SET_BADGE_NUM(state, badgeNum) {
		if (badgeNum) {
			uni.setTabBarBadge({
				index: 0,
				text: badgeNum > 99 ? '99+' : badgeNum.toString()
			});
		} else {
			uni.removeTabBarBadge({
				index: 0
			});
		}
		state.badgeNum = badgeNum
	},
	SET_MSGINFO(state, msgInfo) {
		state.msgInfo = msgInfo
	},
	SET_RECENTLYS(state, recentlys) {
		state.recentlys = recentlys
	},
	SET_FORMUSERID(state, id) {
		state.formUserId = formUserId
	},
};
const actions = {
	receiveMessage({
		state,
		commit
	}, data) {
		if (state.formUserId === data.formUserId) {
			data.unreadMessage = 0
		} else {
			data.unreadMessage = 1
			const badgeNum = state.badgeNum + 1
			commit('SET_BADGE_NUM', badgeNum)
		}
		Vue.prototype.eventHub && Vue.prototype.eventHub.$emit('updateList', data)
	},
}
export default {
	namespaced: true,
	state,
	mutations,
	actions
}
