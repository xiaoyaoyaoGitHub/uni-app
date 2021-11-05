import request from '@/utils/request'


//app版本升级
export function versionUpgrade(appName) {
	return request({
		url: `/api/file/AppStartInfo/${appName}`,
	})
}

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
		url: `/api/system/Area/${id}/Selector/0`,
		options: {
			load: false
		}
	})
}
// 获取组织/公司下拉框列表
export function getOrganizeSelector() {
	return request({
		url: '/api/permission/Organize/Selector/0',
		options: {
			load: false
		}
	})
}
// 获取部门下拉框列表(公司+部门)
export function getDepartmentSelector() {
	return request({
		url: '/api/permission/Organize/Department/Selector/0',
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

//获取用户详情
export function getUesrDetail(id) {
	return request({
		url: '/api/app/User/' + id,
		method: 'GET'
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
// 获取用户列表(分页)
export function getImUser(data, options) {
	return request({
		url: '/api/permission/Users/ImUser',
		data,
		options
	})
}
// 获取接口数据
export function previewDataInterface(id) {
	return request({
		url: `/api/system/DataInterface/${id}/Actions/Response`,
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
		data,
		header: {
			'Content-Type': 'application/x-www-form-urlencoded',
		}
	})
}

//获取验证码图片
export function getCodeImg() {
  return request({
    url: '/api/oauth/code',
    method: 'get'
  })
}

//获取验证码
export function clickSms(account) {
	return request({
		url: 'https://app.cudtsoft.com/api/Saas/Tenant/SmsCode/' + account,
		method: 'GET',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded',
		}
	})
}
//验证码登录
export function loginSms(data) {
	return request({
		url: 'https://app.cudtsoft.com/api/Saas/Tenant/LoginSms',
		method: 'POST',
		data,
		header: {
			'Content-Type': 'application/x-www-form-urlencoded',
		}
	})
}
// 退出登录
export function logout() {
	return request({
		url: '/api/oauth/Logout'
	})
}

// 获取当前用户信息
export function getCurrentUser() {
	return request({
		url: '/api/app/User'
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

// 获取下载文件链接
export function getDownloadUrl(type, fileId) {
	return request({
		url: `/api/file/Download/${type}/${fileId}`,
		method: 'GET'
	})
}
