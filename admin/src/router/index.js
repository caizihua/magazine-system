import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import CategoryEdit from "../views/CategoryEdit.vue";
import DirectoryEdit from "../views/DirectoryEdit.vue";
import CategoryList from "../views/CategoryList.vue";

import MagEdit from "../views/MagEdit.vue";
import MagList from "../views/MagList.vue";

import ArticleEdit from "../views/ArticleEdit.vue";
import ArticleList from "../views/ArticleList.vue";

import SwiperEdit from "../views/SwiperEdit.vue";
import SwiperList from "../views/SwiperList.vue";

import PeriodEdit from "../views/PeriodEdit.vue";
import PeriodList from "../views/PeriodList.vue";

import AdminUserEdit from "../views/AdminUserEdit.vue";
import AdminUserList from "../views/AdminUserList.vue";
Vue.use(VueRouter);
const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
    //meta称为路由元信息，可以被守卫查询到
    meta: {
      isPublic: true
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      isPublic: true
    }
  },
  {
    path: "/",
    component: Main,
    children: [
      {
        path: "/categories/create",
        component: CategoryEdit
      },
      {
        path: "/categories/edit/:id",
        component: CategoryEdit,
        props: true
      },
      {
        path: "/categories/list",
        component: CategoryList
      },

      {
        path: "/magazines/create",
        component: MagEdit
      },
      {
        path: "/magazines/edit/:id",
        component: MagEdit,
        props: true
      },
      {
        path: "/magazines/directory/:id",
        component: DirectoryEdit,
        props: true
      },
      {
        path: "/magazines/list",
        component: MagList
      },
      {
        path: "/articles/create",
        component: ArticleEdit
      },
      {
        path: "/articles/edit/:id",
        component: ArticleEdit,
        props: true
      },
      {
        path: "/articles/list",
        component: ArticleList
      },
      {
        path: "/swiper/create",
        component: SwiperEdit
      },
      {
        path: "/swiper/edit/:id",
        component: SwiperEdit,
        props: true
      },
      {
        path: "/swiper/list",
        component: SwiperList
      },
      {
        path: "/periods/create",
        component: PeriodEdit
      },
      {
        path: "/periods/edit/:id",
        component: PeriodEdit,
        props: true
      },
      {
        path: "/periods/list",
        component: PeriodList
      },
      {
        path: "/admin_users/create",
        component: AdminUserEdit
      },
      {
        path: "/admin_users/edit/:id",
        component: AdminUserEdit,
        props: true
      },
      {
        path: "/admin_users/list",
        component: AdminUserList
      }
    ]
  }
];

const router = new VueRouter({
  routes
});
router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    if (to.path == "/register") {
      return next();
    }
    return next("/login");
  }
  next();
});
export default router;
