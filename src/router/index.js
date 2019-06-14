import Vue from "vue";
import Router from "vue-router";
import Home from "components/Home";
Vue.use(Router);
const router = new Router({
  routes: [
    {
      path: "/", // 默认进入路由
      redirect: "/home", //重定向
    },
    {
      path: "/home",
      name: "Home",
      component: Home,
    },
  ],
});
export default router;
