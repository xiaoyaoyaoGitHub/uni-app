/* process.env.NODE_ENV设置生产环境模式 */
/*JAVA app.java.jnpfsoft.com  NET dotnet.jnpfsoft.com*/
const baseURL = process.env.NODE_ENV === "production" ?
	"https://app.java.jnpfsoft.com" : "http://192.168.0.18:7004" // 接口前缀
const define = {
	baseURL: baseURL,
	webSocketUrl: process.env.NODE_ENV === "production" ? "wss://app.java.jnpfsoft.com/websocket" :
		"ws://192.168.0.18:7004/api/message/websocket",
	comUploadUrl: baseURL + '/api/file/Uploader/',
	timeout: process.env.NODE_ENV === 'production' ? 60000 : 10000,
	version: "V3.2.4"
}
export default define
