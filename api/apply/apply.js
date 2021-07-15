import request from '@/utils/request'
// 获取应用菜单
export function getMenuList() {
	return request({
		url: '/api/app/Menu'
	})
}
// 获取常用 1-流程 2-应用
export function getUsualList(type) {
	return request({
		url: '/api/app/Data/?type=' + type
	})
}
export function addUsual(data) {
	return request({
		url: '/api/app/Data',
		method: 'post',
		data
	})
}
export function delUsual(id) {
	return request({
		url: '/api/app/Data/' + id,
		method: 'delete'
	})
}
export function getFlowList() {
	return request({
		url: '/api/app/Data/getFlowList'
	})
}
export function getDataList() {
	return request({
		url: '/api/app/Data/getDataList'
	})
}
