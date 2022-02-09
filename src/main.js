import Vue from 'vue'
import App from './App.vue'
import router from "./router";
// 全局引入vant
import vant from "vant";
import "vant/lib/index.css";

// 全局引入懒加载
import { Lazyload } from "vant";

Vue.config.productionTip = false

Vue.use(vant);

// 使用懒加载
Vue.use(Lazyload, {
  // 未加载的占位图片
  loading: require("@/assets/img/common/placeholder.png")
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
