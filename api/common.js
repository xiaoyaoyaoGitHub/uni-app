import request from '@/utils/request'

// 获取数据字典数据
export function getDictionaryDataAll() {
	return request({
		url: '/api/system/DictionaryData/All'
	})
}
// 获取字典数据下拉框列表
export function getDictionaryDataSelector(dictionaryTypeId) {
	return request({
		url: `/api/system/DictionaryData/${dictionaryTypeId}/Data/Selector`,
		options: {
			load: false
		}
	})
}
// 获取行政区划下拉框数据
export function getProvinceSelector(id) {
	return request({
		url: `/api/system/Area/${id}/Selector`,
		options: {
			load: false
		}
	})
}
// 获取组织/公司下拉框列表
export function getOrganizeSelector() {
	return request({
		url: '/api/permission/Organize/Selector',
		options: {
			load: false
		}
	})
}
// 获取部门下拉框列表(公司+部门)
export function getDepartmentSelector() {
	return request({
		url: '/api/permission/Organize/Department/Selector',
		options: {
			load: false
		}
	})
}
// 获取岗位下拉列表（公司+部门+岗位）
export function getPositionSelector() {
	return request({
		url: '/api/permission/Position/Selector',
		options: {
			load: false
		}
	})
}
// 获取用户下拉框列表(公司+部门+用户)
export function getUserSelector() {
	return request({
		url: '/api/permission/Users/Selector',
		options: {
			load: false
		}
	})
}
// 获取所有用户列表
export function getUserAll() {
	return request({
		url: '/api/permission/Users/All',
		options: {
			load: false
		}
	})
}
// 获取接口数据
export function previewDataInterface(id) {
	return request({
		url: `/api/system/Base/DataInterface/${id}/Actions/Response`,
		options: {
			load: false
		}
	})
}
// 用户登录
export function login(data) {
	return request({
		url: '/api/oauth/Login',
		method: 'post',
		data
	})
}
// 退出登录
export function logout() {
	return request({
		url: '/api/oauth/Logout'
	})
}

// 获取当前用户信息
export function getUserInfo() {
	return request({
		url: '/api/oauth/CurrentUser'
	})
}

// 用户登录测试
export function login2(data) {
	return request({
		url: '/api/oauth',
		method: 'GET',
		data,
		options: {
			load: false
		}
	})
}

export function getBillNumber(enCode) {
	return request({
		url: `/api/system/BillRule/BillNumber/${enCode}`,
		method: 'GET',
		options: {
			load: false
		}
	})
}