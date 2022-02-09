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
	// return new Promise((resolve, reject) => {
	// 	resolve()
	// })
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

export const moduleTitle = {
	newstoreproject: '储备项目',
	newongoingproject: '在建项目',
	newliveproject: "竣工项目",
	videoProject: "视频项目",
	favoriteproject: "收藏项目",
}

export const moduleCodes = {
	// 储备项目
	StorePhaseProject: 'newstoreproject',
	// 在建项目
	BuildingPhaseProject: 'newongoingproject',
	// 运营项目
	OperationPhaseProject: 'newliveproject',
	// 注销项目
	CancelPhaseProject: '',
	VideoPorject: "videoProject",
	//收藏项目
	favoriteproject: 'favoriteproject',
	//项目详情 - 储备进度
	storeProcessCode: 'storeprogress',
	//项目详情 - 在建进度
	buildProgressCode: 'BuildProgress',
	buildPrgressTemplateCode: 'BuildProgressTemplate',
	//项目详情 - 在建进度日志
	buildProgressLogCode: 'BuildProgressLog',
	//项目详情 - 项目问题
	projectIssuesCode: 'ProjectIssues',
	//项目详情 - 项目运营
	projectOperationCode: 'ProjectOperation',
	//项目详情 - 前期手续
	preAuditCode: 'preaudit',
	preAuditTemplateCode: 'PreAuditTemplate',
	//项目详情 - 前期手续日志
	preAuditLogCode: 'preAuditLog',
	customizedDetails: '储备项目,在建项目,运营项目,收藏项目',
	myFavoriteModules: '收藏项目',
	//营商问题
	ProjectOperationIssue: 'ProjectOperationIssue',
	OperationIssueList: 'OperationIssueList',
	ProjectSpanYearAdjust: 'ProjectSpanYearAdjust',
	ProjectYearHistory: 'ProjectYearHistory',
	ProjectMap: 'ProjectMap',
	//项目详情 - 在建项目调度
	ProjectProcessReview: 'ProjectProcessReview',
	ProcessReviewProjectItems: 'ProcessReviewProjectItems',
	//项目审核
	ProjectReview: 'ProjectReview',
	//通知公告
	notification: 'notification',
	//首页幻灯片
	AppHomeSwiper: 'AppHomeSwiper',
	//项目列表
	AppProjectList: 'AppProjectList',
	// 最近调度
	ProjectLatestProgress: 'ProjectLatestProgress'
}

export const reviewOptions = [{
		key: "0",
		name: '未提交'
	},
	{
		key: "1",
		name: '等待审核'
	},
	{
		key: "2",
		name: '审核通过'
	},
	{
		key: "3",
		name: '审核驳回'
	},
	{
		key: "4",
		name: '流程撤回'
	},
	{
		key: "5",
		name: '审核终止'
	}
]

export function formatNumber(value) {
	if (!value) return '0.00'
	value = value.toFixed(2)
	var intPart = Math.trunc(value) // 获取整数部分
	var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
	var floatPart = '.00' // 预定义小数部分
	var value2Array = value.split('.')
	// =2表示数据有小数位
	if (value2Array.length === 2) {
		floatPart = value2Array[1].toString() // 拿到小数部分
		if (floatPart.length === 1) { // 补0,实际上用不着
			return intPartFormat + '.' + floatPart + '0'
		} else {
			return intPartFormat + '.' + floatPart
		}
	} else {
		return intPartFormat + floatPart
	}
}
