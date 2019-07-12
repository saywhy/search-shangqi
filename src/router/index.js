import Vue from "vue";
import Router from "vue-router";
import Home from "components/home";
import Detail from "components/detail";
import News from "components/news";
Vue.use(Router);
const router = new Router({
  routes: [
    {
      path: "/", // 默认进入路由
      redirect: "/home" //重定向
    },
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/detail",
      name: "detail",
      component: Detail
    },
    {
      path: "/news",
      name: "news",
      component: News
    }
  ]
});
export default router;
