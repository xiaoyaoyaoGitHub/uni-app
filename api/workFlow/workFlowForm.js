import request from '@/utils/request'

export function Info(key, id) {
	key = key.replace(key[0], key[0].toUpperCase())
	return request({
		url: `/api/workflow/Form/${key}/${id}`,
		method: 'get'
	})
}
export function Create(key, data) {
	key = key.replace(key[0], key[0].toUpperCase())
	return request({
		url: `/api/workflow/Form/${key}`,
		method: 'post',
		data
	})
}
export function Update(key, data) {
	key = key.replace(key[0], key[0].toUpperCase())
	return request({
		url: `/api/workflow/Form/${key}/${data.id}`,
		method: 'put',
		data
	})
}
// 获取动态表单信息
export function DynamicInfo(id) {
	return request({
		url: `/api/workflow/Engine/FlowTask/${id}`,
		method: 'get'
	})
}
// 新建动态表单
export function DynamicCreate(key, data) {
	return request({
		url: `/api/workflow/Engine/FlowTask`,
		method: 'post',
		data
	})
}
// 修改动态表单
export function DynamicUpdate(key, data) {
	return request({
		url: `/api/workflow/Engine/FlowTask/${data.id}`,
		method: 'put',
		data
	})
}

// 获取商品列表
export function getGoodsList(data) {
	return request({
		url: `/api/workflow/Form/CrmOrder/Goods`,
		method: 'get',
		data,
		options: {
			load: false
		}
	})
}
// 获取客户列表
export function getCustomerList(keyword) {
	return request({
		url: `/api/workflow/Form/CrmOrder/Customer`,
		method: 'get',
		data: {
			keyword: keyword || ''
		},
		options: {
			load: false
		}
	})
}
