import request from '@/utils/request'
//获取我发出的日志
export function getSendJournalList(data,options){
	return request({
		url: `/api/extend/WorkLog/Send`,
		method: 'GET',
		data,
		options
	})
}
//获取收到的日志
export function getReceiveJournalList(data,options){
	return request({
		url: `/api/extend/WorkLog/Receive`,
		method: 'GET',
		data,
		options
	})
}
//日志info
export function infoReportLog(id){
	return request({
		url: `/api/extend/WorkLog/${id}`,
		method: 'GET',
	})
}
//日志保存
export function saveReportLog(data){
	return request({
		url: `/api/extend/WorkLog`,
		method: 'POST',
		data
	})
}
//日志修改
export function modifyReportLog(data,id){
	return request({
		url: `/api/extend/WorkLog/${id}`,
		method: 'PUT',
		data
	})
}