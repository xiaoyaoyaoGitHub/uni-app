import request from '@/utils/request'

// 获取待我审核
export function FlowBeforeList(category, data, options) {
	return request({
		url: `/api/workflow/Engine/FlowBefore/List/${category}`,
		method: 'get',
		data,
		options
	})
}
// 获取待我审批信息
export function FlowBeforeInfo(id, data) {
	return request({
		url: `/api/workflow/Engine/FlowBefore/${id}`,
		method: 'get',
		data
	})
}
// 待我审核审核
export function Audit(id, data) {
	return request({
		url: `/api/workflow/Engine/FlowBefore/Audit/${id}`,
		method: 'post',
		data
	})
}
// 待我审核驳回
export function Reject(id, data) {
	return request({
		url: `/api/workflow/Engine/FlowBefore/Reject/${id}`,
		method: 'post',
		data
	})
}
// 撤回审核
export function Recall(id, data) {
	return request({
		url: `/api/workflow/Engine/FlowBefore/Recall/${id}`,
		method: 'post',
		data
	})
}
// 待我审核转办
export function Transfer(id, data) {
	return request({
		url: `/api/workflow/Engine/FlowBefore/Transfer/${id}`,
		method: 'post',
		data
	})
}
