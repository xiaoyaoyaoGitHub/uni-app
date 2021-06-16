import request from '@/utils/request'
/* 获取日程初始值 */
export function initSchedule(data){
	return request({
		url: `/api/extend/Schedule/AppList`,
		method: 'GET',
		data
	})
}
//日程info
export function infoSchedule(id){
	return request({
		url: `/api/extend/Schedule/${id}`,
		method: 'GET',
	})
}
//日程保存
export function saveSchedule(data){
	return request({
		url: `/api/extend/Schedule`,
		method: 'POST',
		data
	})
}
//日程修改
export function modifySchedule(data,id){
	return request({
		url: `/api/extend/Schedule/${id}`,
		method: 'PUT',
		data
	})
}
//日程删除
export function detailSchedule(id){
	return request({
		url: `/api/extend/Schedule/${id}`,
		method: 'Delete',
	})
}