import request from '@/utils/request'

// 获取IM对话列表
export function getIMReply() {
	return request({
		url: '/api/message/imreply',
	})
}
//获取公告列表
export function getNoticeList(data) {
	return request({
		method: 'GET',
		url: '/api/message',
		data
	})
}
//公告详情
export function getNoticeDetail(id) {
	return request({
		method: 'GET',
		url: `/api/message/ReadInfo/${id}`
	})
}
//获取系统消息列表
export function getSysMsgList(data) {
	return request({
		method: 'GET',
		url: '/api/message',
		data
	})
}
//系统消息详情
export function sysMsgInfo(id) {
	return request({
		method: 'GET',
		url: `/api/message/ReadInfo/${id}`
	})
}
