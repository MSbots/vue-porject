import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/login/index.vue";
import Home from "../views/Home.vue";
import Register from '../views/Register.vue';

Vue.use(VueRouter);

const routes = [
  //重定向
  {
    path: "/",
    redirect: "/login/index",
    // redirect: "/home",
  },
  //登录
  {
    path: "/login/index",
    name: "登录",
    component: Index
  },
  //首页
  {
    path: "/home",
    name: "首页",
    component: Home
  },
  //注册
  {
    path: "/register",
    name: "注册",
    component: Register
  }

];

const router = new VueRouter({
  routes
});

export default router;
