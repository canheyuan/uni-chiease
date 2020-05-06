import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

//全局变量
import commomConfig from 'utils/common.js'
Vue.prototype.$common = commomConfig

//全局读取数据函数
import commomHttp from 'utils/http.js'
Vue.prototype.$http = commomHttp

//可以优化放全局 uCharts ==>使用全局
import uCharts from 'plugins/stan-ucharts/u-charts/u-charts.js'; 
Vue.prototype.$uCharts = uCharts

//通用404
import noData from './components/noData/noData.vue'
Vue.component('noData',noData)

App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()