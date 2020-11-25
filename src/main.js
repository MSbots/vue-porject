import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import axios from "axios";
import $axios from "axios";
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import global_ from './Base.vue';

// Vue.prototype.$http = axios;
Vue.prototype.$axios = $axios
Vue.prototype.GLOBAL =global_;
Vue.config.productionTip = false;

Vue.use(ElementUI)
$axios.defaults.baseURL =global_.BASE_URL;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
