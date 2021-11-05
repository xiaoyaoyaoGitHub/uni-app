/* process.env.NODE_ENV设置生产环境模式 */
/*JAVA app.java.cudtsoft.com  NET dotnet.cudtsoft.com*/
const baseURL = process.env.NODE_ENV === "production" ?
	"http://124.94.143.105:29999" : "http://127.0.0.1:30000" // 接口前缀
const define = {
	baseURL: baseURL,
	webSocketUrl: process.env.NODE_ENV === "production" ? "wss://app.java.cudtsoft.com/websocket" :
		"ws://192.168.0.18:7005/api/message/websocket",
	comUploadUrl: baseURL + '/api/file/Uploader/',
	timeout: process.env.NODE_ENV === 'production' ? 60000 : 10000,
	version: "V3.2.4"
}
export default define
