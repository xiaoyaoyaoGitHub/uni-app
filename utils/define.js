/* process.env.NODE_ENV设置生产环境模式 */
const baseURL = process.env.NODE_ENV === "production" ?
	"http://192.168.0.18:7004" : "http://192.168.0.18:7004" // 接口前缀
const define = {
	baseURL: baseURL,
	webSocketUrl: process.env.NODE_ENV === "production" ? "ws://192.168.0.18:7004/api/message/websocket" :
		"ws://192.168.0.18:7004/api/message/websocket",
	comUploadUrl: baseURL + '/api/file/Uploader/',
	timeout: process.env.NODE_ENV === 'production' ? 60000 : 10000,
	version: "3.2"
}
export default define
