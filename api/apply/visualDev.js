import request from '@/utils/request'
// 获取数据详情
export function getDataChangeViaCode(encode, id) {
	return request({
		url: `/api/visualdev/code/OnlineDev/${encode}/${id}/DataChange`,
		method: 'GET'
	})
}

// 项目图片
export function projectImageList(data) {
	return request({
		url: '/api/extend/Document/project',
		method: 'get',
		data
	})

}

// 图片上传
export function projectImageUpLoad(data) {
	return request({
		url: '/api/extend/Document/Uploader',
		method: 'post',
		data
	})

}

// 地图列表
export function mapList(data) {
	return request({
		url: '/api/extend/dataReport/ProjectMap/mapList',
		method: 'post',
		data
	})
}

export function getConfigDataViaCode(encode) {
	return request({
		url: `/api/visualdev/code/OnlineDev/${encode}/Config`,
		method: 'get'
	})
}

// 获取数据列表
export function getModelListViaCode(code, data) {
	return request({
		url: `/api/visualdev/code/OnlineDev/${code}/List`,
		method: 'post',
		data
	})
}

export function getModelInfoViaCode(code, id) {
	return request({
		url: `/api/visualdev/code/OnlineDev/${code}/${id}`,
		method: 'GET'
	})
}

// 添加数据
export function createModelViaCode(code, data) {
	return request({
		url: `/api/visualdev/code/OnlineDev/${code}`,
		method: 'POST',
		data
	})
}
// 修改数据
export function updateModelViaCode(code, data) {
	return request({
		url: `/api/visualdev/code/OnlineDev/${code}/${data.id}`,
		method: 'PUT',
		data
	})
}

// 修改输入数据
export function updateInputModelViaCode(code, data) {
	return request({
		url: `/api/visualdev/code/OnlineDev/updateOnly/${code}/${data.id}`,
		method: 'PUT',
		data
	})
}
// 获取列表表单配置JSON
export function getConfigData(modelId) {
	return request({
		url: `/api/visualdev/OnlineDev/${modelId}/Config`,
		method: 'GET'
	})
}
// 获取数据列表
export function getModelList(modelId, data, options) {
	return request({
		url: `/api/visualdev/OnlineDev/${modelId}/List`,
		method: 'POST',
		data,
		options
	})
}
// 添加数据
export function createModel(modelId, data) {
	return request({
		url: `/api/visualdev/OnlineDev/${modelId}`,
		method: 'POST',
		data
	})
}
// 修改数据
export function updateModel(modelId, data) {
	return request({
		url: `/api/visualdev/OnlineDev/${modelId}/${data.id}`,
		method: 'PUT',
		data
	})
}
// 获取数据信息
export function getModelInfo(modelId, id) {
	return request({
		url: `/api/visualdev/OnlineDev/${modelId}/${id}`,
		method: 'GET'
	})
}

// 获取项目详情
export function getProjectInfo(modelId, id) {
	return request({
		url: `/api/visualdev/OnlineDev/${modelId}/${id}/DataChange`,
		method: 'GET'
	})
}
// 删除数据
export function deteleModel(modelId, id) {
	return request({
		url: `/api/visualdev/OnlineDev/${modelId}/${id}`,
		method: 'DELETE'
	})
}
// 修改输入数据
export function updateInputModel(modelId, data) {
	return request({
		url: `/api/visualdev/OnlineDev/updateOnly/${modelId}/${data.id}`,
		method: 'PUT',
		data
	})
}
