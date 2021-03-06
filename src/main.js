import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
import 'element-ui/lib/theme-chalk/index.css'
//import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
import routes from './routes'
// import Mock from './mock'
// Mock.bootstrap();
import 'font-awesome/css/font-awesome.min.css'
import axios from 'axios'

//引入axios
Vue.prototype.$axios=axios
Vue.config.productionTip = false

// import VueResource from 'vue-resource'
// Vue.use(VueResource)

//引入数据请求方法
import ajax from './methods/ajax.js';
Vue.prototype.ajax = ajax;

import datetime from './methods/datetime.js';
Vue.prototype.datetime = datetime;


Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

//NProgress.configure({ showSpinner: false });

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  //NProgress.start();
//   console.log(from)
//   console.log(to)
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem("innertime");
    // localStorage.removeItem('user');
    // localStorage.removeItem("innertime");
  }
//let user = localStorage.getItem('user');
  let user = sessionStorage.getItem('user');
  console.log(user)
//   console.log(JSON.parse(sessionStorage.getItem('user')))
//   console.log( to.path)
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})


import AMap from 'vue-amap';
Vue.use(AMap);

  // 初始化vue-amap
AMap.initAMapApiLoader({
  // 高德key
  key: '4365df5e295713cc4d8dcbdcef934a0f',
  // 插件集合 （插件按需引入）
  // plugin: ['AMap.Geolocation']
  plugin: ['AMap.Geocoder','AMap.Geolocation','AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
});



//router.afterEach(transition => {
//NProgress.done();
//});

new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app')

