import { AuthMethods } from "@/api";
import type { UserInfo } from "firebase/auth";
import { defineStore } from "pinia";
import { computed, reactive, shallowRef } from "vue";
import type { Writable } from "@/types";
import { getFromSessionStorage, setSessionStorage } from "@/utils/storage";

const SESSION_STORAGE_KEY = "user";

export const useAuth = defineStore("auth", () => {
  const createDefaultUser = () => ({
    uid: "",
    displayName: null,
    email: null,
    phoneNumber: null,
    photoURL: null,
    providerId: "",
  });

  const storedUser = getFromSessionStorage<UserInfo>(SESSION_STORAGE_KEY);

  const user = shallowRef<Writable<UserInfo>>(
    storedUser ?? createDefaultUser()
  );
  const loadings = reactive({ signIn: false, signOut: false, signUp: false });
  const errors = reactive({ signIn: "", signOut: "", signUp: "" });

  const isAuthenticated = computed(() => !!user.value.uid);

  const clearUser = () => {
    user.value = createDefaultUser();
  };

  const setUser = (newUser: UserInfo) => {
    user.value = newUser;
    setSessionStorage(SESSION_STORAGE_KEY, newUser);
  };

  const signUp = async (email: string, password: string) => {
    try {
      loadings.signUp = true;
      const res = await AuthMethods.signUp(email, password);
      setUser(res);
    } catch (error) {
      errors.signUp = error as string;
    } finally {
      loadings.signUp = false;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      loadings.signIn = true;
      const res = await AuthMethods.signIn(email, password);
      setUser(res);
    } catch (error) {
      errors.signIn = error as string;
    } finally {
      loadings.signIn = false;
    }
  };

  const signOut = async () => {
    try {
      loadings.signOut = true;
      AuthMethods.signOut();
      clearUser();
    } catch (error) {
      errors.signOut = error as string;
    } finally {
      loadings.signOut = false;
    }
  };

  return {
    signIn,
    signUp,
    signOut,
    isAuthenticated,
    user: computed(() => user.value),
    errors: computed(() => errors),
    loadings: computed(() => loadings),
  };
});
