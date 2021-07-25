import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index.js"

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect: { name: "Chat" },
    },
    {
      path: '/chat',
      name: 'Chat',
      component: () => import("../views/Chat.vue"),
      meta: {
        requireAuth : true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import("../views/Login.vue")
    }
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
  });

//ナビゲーションガード
router.beforeEach((to, from, next) => {
    if (
        to.matched.some((record) => record.meta.requireAuth == true) && !store.getters.getIsLogin 
        ) {
        console.log("not authorized. move login page.");
        next({ path: "/login" });
        }
    else {
        next()
    }

})

export default router;