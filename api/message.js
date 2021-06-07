import request from '@/utils/request'

// 获取IM对话列表
export function getIMReply() {
	return request({
		url: '/api/message/imreply',
	})
}
