import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import FastClick from 'fastclick'; 
import VueLazyload from 'vue-lazyload';

import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

// import toast from './components/common/toast/index';
// 安装toast插件
// Vue.use(toast);

// 使用vueLazyLoad插件
Vue.use(VueLazyload,{
  loading:require('./assets/images/common/placeholder.png')
});

Vue.config.productionTip = false;

Vue.prototype.$bus = new Vue();

// 解决移动端300ms的延迟
FastClick.attach(document.body); 

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
