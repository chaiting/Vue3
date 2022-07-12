import { createRouter, createWebHistory } from "vue-router";
import { useProfileStore } from "@/stores/profile";
import userProfileApi from "@/api/core/user-profile-api";
import frontendAccessLogApi from "@/api/core/frontend-access-log-api";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      /** Home page */
      path: "/",
      name: "LandingPage",
      redirect: { name: "F010101SCN" },
    },
    // f01
    {
      path: "/f010101scn",
      name: "F010101SCN",
      component: () => import("@/views/f01/F010101SCN.vue"),
    },
    // f02
    {
      path: "/f020101scn",
      name: "F020101SCN",
      component: () => import("@/views/f02/F020101SCN.vue"),
    },
    // f03
    {
      path: "/f030101scn",
      name: "F030101SCN",
      component: () => import("@/views/f03/F030101SCN.vue"),
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
  if (profileStore.isLogin) {
    frontendAccessLogApi
      .doSaveFrontedAccessLog({
        resourceUri: to.path,
        resourceType: "N",
      })
      .finally(() => next());
  }

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
