import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

//全局变量
import commomConfig from 'utils/common.js'
Vue.prototype.$common = commomConfig

//全局读取数据函数
import commomHttp from 'utils/http.js'
Vue.prototype.$http = commomHttp

App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
