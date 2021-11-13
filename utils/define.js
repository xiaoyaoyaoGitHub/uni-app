/* process.env.NODE_ENV设置生产环境模式 */
/*JAVA app.java.cudtsoft.com  NET dotnet.cudtsoft.com*/
const baseURL = process.env.NODE_ENV === "production" ?
	"http://124.94.143.105:29999" : "http://124.94.143.105:29999" // 接口前缀
const frontURL = process.env.NODE_ENV === "production" ?
	"http://124.94.143.105:33000" : "http://124.94.143.105:33000"
const define = {
	baseURL: baseURL,
	frontURL: frontURL,
	webSocketUrl: process.env.NODE_ENV === "production" ? "wss://124.94.143.105:29999/websocket" :
		"ws://124.94.143.105:29999/api/message/websocket",
	comUploadUrl: baseURL + '/api/file/Uploader/',
	timeout: process.env.NODE_ENV === 'production' ? 60000 : 60000,
	version: "V1.0.0"
}
export default define
