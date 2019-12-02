import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import Fastclick from 'fastclick'
import md5 from 'js-md5' 
import request from 'assets/js/request/api.js'
import requestUrl from 'assets/js/request/requestUrl.js'

//自定义字体库
import 'assets/font/font_1511230_kparicrh2tq/iconfont.css'

//引入vant
import { Icon, Toast } from 'vant'
Vue.use(Icon, Toast)

Vue.config.productionTip = false
Vue.prototype.$md5 = md5
Vue.prototype.request = request
Vue.prototype.requestUrl = requestUrl.url


new Vue({
  router,
  el: '#app',
  render: h => h(App)
});



//way-2
/* new Vue({
  router,
  render: h => h(App)
}).$mount('#app') */

//问题：当使用FastClick 时，input框在ios上点击输入调取手机自带输入键盘不灵敏，有时候甚至点不出来。而安卓上完全没问题。这个原因是因为FastClick的点击穿透。
//FastClick的ios点击穿透解决方案
Fastclick.prototype.focus = function (targetElement) {
  let length;
  if (targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
      length = targetElement.value.length;
      targetElement.focus();
      targetElement.setSelectionRange(length, length);
  } else {
      targetElement.focus();
  }
};

Fastclick.attach(document.body);

//way2
/*if ("addEventListener" in document && "ontouchstart" in window) {
  FastClick.prototype.focus = function(targetElement) {
    targetElement.focus();
  };
  document.addEventListener(
    "DOMContentLoaded",
    function() {
      FastClick.attach(document.body);
    },
    false
  );
}*/
