import Vue from 'vue'
import App from './App'
import store from './store'

import uView from '@/uview-ui'
Vue.use(uView)

// 添加实例属性
Object.assign(Vue.prototype, {
	define: require("./utils/define").default,
	request: require("./utils/request").default,
	jnpf: require("./utils/jnpf").default,
	eventHub: new Vue(),
	$store: store
})

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
