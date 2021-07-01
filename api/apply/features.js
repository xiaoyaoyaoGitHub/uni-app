import request from '@/utils/request'

export function config(id) {
	return request({
		url: `/api/visualdev/OnlineDev/App/${id}/Config`,
		method: 'GET'
	})
}

export function wirteBack(id,featuresId) {
	return request({
		url: `/api/visualdev/OnlineDev/App/${featuresId}/${id}`,
		method: 'GET'
	})
}

export function list(data) {
	return request({
		url: `/api/visualdev/OnlineDev/App/${data.featuresId}/List`,
		method: 'GET',
		data
	})
}
export function create(data,featuresId) {
	return request({
		url: `/api/visualdev/OnlineDev/App/${featuresId}`,
		method: 'POST',
		data,
	})
}
export function update(data,featuresId,options) {
	return request({
		url: `/api/visualdev/OnlineDev/App/${featuresId}/${data.id}`,
		method: 'PUT',
		data, 
		options
	})
}
export function delList(featuresId,id) {
	return request({
		url: `/api/visualdev/OnlineDev/App/${featuresId}/${id}`,
		method: 'Delete',
	})
}