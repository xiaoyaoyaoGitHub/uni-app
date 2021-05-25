import store from '@/store'
import define from './define'
const host = define.baseURL
const defaultOpt = {
	load: true
}

// 示例
// async xxxx(code) {
//   var res = await this.request({
// 		url: '/api/System/DictionaryData/All',
// 		method: 'GET',
// 		data,
// 		options: {
// 			load: false
// 		}
// 	})
//   if (!res) return
//   console.log(res)
// }

function request(config) {
	config.options = Object.assign(defaultOpt, config.options)
	const token = uni.getStorageSync('token') || ''
	let header = {
		"content-type": "application/json;charset=UTF-8",
		
	}
	if (token) header['Authorization'] = token
	let url = config.url.indexOf('http') > -1 ? config.url : host + config.url
	if (config.url === '/api/oauth/Login') {
		url += '?client_id=admin&client_secret=123456&scope=all&grant_type=password'
	}

	if (config.options.load) {
		uni.showLoading({
			title: config.options.loadText || ''
		})
	}

	return new Promise((resolve, reject) => {
		uni.request({
			url: url,
			data: config.data || null,
			method: config.method || 'GET',
			header:  config.header || header,
			timeout: define.timeout,
			success: res => {
				uni.hideLoading()
				if (res.statusCode === 200) {
					if (res.data.code == 200) {
						resolve(res.data)
					} else {
						ajaxError(res.data)
						reject(res.data.msg)
					}
				} else {
					ajaxError(res.data)
					reject(res.errMsg)
				}
			},
			fail: err => {
				uni.hideLoading()
				reject(err)
			}
		})
	})
}

function ajaxError(data) {
	uni.showToast({
		title: data.msg || '请求出错，请重试',
		icon: 'none',
		complete() {
			if (data.code === 600 || data.code === 601 || data.code === 602) {
				setTimeout(() => {
					store.dispatch('user/resetToken').then(() => {
						uni.reLaunch({
							url: '/pages/login/index'
						})
					})
				}, 1500)
			}
		}
	})
}

export default request
