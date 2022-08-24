import { createRouter, createWebHistory } from "vue-router";
import { useProfileStore } from "@/core/store/profile";
import userProfileApi from "@/core/api/user-profile-api";
import frontendAccessLogApi from "@/core/api/frontend-access-log-api";

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
      meta: { noKeepAlive: true },
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
      path: "/f030201scn",
      name: "F030201SCN",
      component: () => import("@/views/f03/F030201SCN.vue"),
    },
    // f04
    {
      path: "/f040101scn",
      name: "F040101SCN",
      component: () => import("@/views/f04/F040101SCN.vue"),
    },
    // f05
    {
      path: "/f050101scn",
      name: "F050101SCN",
      component: () => import("@/views/f05/F050101SCN.vue"),
    },
    {
      path: "/forbidden",
      name: "Forbidden",
      component: () => import("@/core/views/Forbidden.vue"),
    },
    {
      path: "/notfound",
      name: "NotFound",
      component: () => import("@/core/views/NotFound.vue"),
    },
    {
      /** 500 Server Internal Server Error */
      path: "/error",
      name: "UnknownError",
      component: () => import("@/core/views/UnknownError.vue"),
    },
    {
      /** 403 Forbidden */
      path: "/forbidden",
      name: "Forbidden",
      component: () => import("@/core/views/Forbidden.vue"),
    },
    {
      /** User Profile not found */
      path: "/user_profile_not_found",
      name: "UserProfileNotFound",
      component: () => import("@/core/views/UserProfileNotFound.vue"),
    },
    {
      path: "/:catchAll(.*)",
      redirect: { name: "NotFound" },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const profileStore = useProfileStore();
  // 1. 如果到下面頁面，直接放行
  if (
    to.name === "NotFound" ||
    to.name === "Forbidden" ||
    to.name === "UnknownError" ||
    to.name === "UserProfileNotFound"
  ) {
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
