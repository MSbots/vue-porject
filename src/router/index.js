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
  },
  {
    path: "/login/index",
    name: "index",
    component: Index
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  
  {
    path: "/register",
    name: "Register",
    component: Register
  }
];

const router = new VueRouter({
  routes
});

export default router;
