// 获取查询条件
import request from "@/utils/request";

export function getQueryConditionData() {
  return request({
    url: '/api/extend/dataReport/queryConditionInfo',
    method: 'get'
  })
}

// 获取汇总报表数据
export function getReportList(data) {
  return request({
    url: '/api/extend/dataReport',
    method: 'post',
    data
  })
}

// 获取详情报表数据
export function getDetailReportList(data) {
  return request({
    url: '/api/extend/dataReport/detailList',
    method: 'post',
    data
  })
}

// 获取地图列表
export function getMapInfoList(data) {
  return request({
    url: `/api/visualdev/code/OnlineDev/ProjectMap/List`,
    method: 'post',
    data
  })
}

// 获取汇总报表EXCEL
export function ExportSummationExcel(data) {
  return request({
    url: '/api/extend/dataReport/ExportSummationExcel',
    method: 'post',
    data
  })
}

// 导出Excel
export function ExportDetailExcel(data) {
  return request({
    url: '/api/extend/dataReport/ExportDetailExcel',
    method: 'post',
    data
  })
}

// 获取子行业
export function getSubBusinessData(id) {
  return request({
    url: `/api/extend/dataReport/querySubBusiness/${id}`,
    method: 'get'
  })
}
