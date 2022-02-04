import request from '@/utils/request'

// 获取IM对话列表
export function getIMReply() {
	return request({
		url: '/api/message/imreply',
	})
}
//获取消息列表
export function getMessageList(data, options) {
	return request({
		url: '/api/message',
		data,
		options
	})
}
//消息详情
export function getMessageDetail(id) {
	return request({
		url: `/api/message/ReadInfo/${id}`
	})
}
