import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
import bmap from 'echarts/extension/bmap/bmap'
import 'echarts/map/js/china'
import App from './App.vue'
Vue.prototype.$echarts = echarts
Vue.prototype.$bmap = bmap

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
