import { useAuth } from "@/stores/auth";
import { router } from "./router";
router.beforeEach((to) => {
  const { isAuthenticated } = useAuth();
  if (to.meta.requiresAuth && !isAuthenticated)
    return {
      path: "/auth",
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    };
});
