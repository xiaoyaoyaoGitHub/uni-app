import request from '@/utils/request'
//获取应用菜单
export function getMenuList() {
	return request({
		url: `/api/oauth/App/CurrentUser`,
		method: 'GET'
	})
}