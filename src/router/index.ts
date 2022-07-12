import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useProfileStore } from "@/stores/profile";
import userProfileApi from "@/api/core/user-profile-api";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/info",
      name: "info",
      component: () => import("@/views/InfoView.vue"),
    },
    {
      path: "/lang",
      name: "lang",
      component: () => import("@/views/LangView.vue"),
    },
    {
      path: "/forbidden",
      name: "forbidden",
      component: () => import("@/views/Forbidden.vue"),
    },
    {
      path: "/notfound",
      name: "notfound",
      component: () => import("@/views/NotFound.vue"),
    },
    {
      path: "/:catchAll(.*)",
      redirect: { name: "home" },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const profileStore = useProfileStore();
  // 1. 如果到下面頁面，直接放行
  if (to.name == "notfound" || to.name == "forbidden") {
    return next();
  }
  // 2. 如果是正式環境且要去代理人身份切換頁面，直接導到存取被拒頁
  if (import.meta.env.PROD && to.name === "Agent") {
    return next({ name: "forbidden" });
  }
  // 3. 如果已經登入過，發送一個request到server端紀錄Access Log

  // 4. 如果尚未取得基本資料，發送一個 request到server端取得，並放入store裡
  if (!profileStore.isLogin) {
    userProfileApi.doFetchLoginUserProfile().then((userProfile) => {
      if (userProfile?.adAccount) {
        profileStore.doStoredUserProfile(userProfile);
        return next();
      } else {
        profileStore.doCleanUserProfile();
        return next({ name: "notfound" });
      }
    });
  }
});

export default router;
