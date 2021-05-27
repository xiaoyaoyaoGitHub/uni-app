/* process.env.NODE_ENV设置生产环境模式 */
const baseURL = process.env.NODE_ENV === "production" ?
	"http://192.168.0.18:7005" : "http://192.168.0.18:7005" // 接口前缀
const define = {
	baseURL: baseURL,
	webSocketUrl: process.env.NODE_ENV === "production" ? "ws://192.168.0.18:7005/api/system/Message/websocket" :
		"ws://192.168.0.18:7005/api/system/Message/websocket",
	comUploadUrl: baseURL + '/api/file/Uploader/',
	timeout: process.env.NODE_ENV === 'production' ? 60000 : 10000,
}
export default define
