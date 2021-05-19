import request from '@/utils/request'

// 获取流程引擎列表
export function FlowEngineList(data) {
	return request({
		url: `/api/workflow/Engine/FlowEngine`,
		method: 'get',
		data
	})
}
// 获取流程引擎信息
export function FlowEngineInfo(id) {
	return request({
		url: `/api/workflow/Engine/FlowEngine/${id}`,
		method: 'get'
	})
}
// 列表ListAll
export function FlowEngineListAll() {
	return request({
		url: `/api/workflow/Engine/FlowEngine/ListAll`,
		method: 'get'
	})
}
// 流程引擎下拉框
export function FlowEngineSelector(type) {
	return request({
		url: `/api/workflow/Engine/FlowEngine/Selector`,
		method: 'get',
		data: {
			type
		}
	})
}
