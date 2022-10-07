<script setup lang="ts">
import { useAuth } from "@/stores/auth";
import { useRouter } from "vue-router";
import { reactive } from "vue";

const { signUp, errors, loadings } = useAuth();
const router = useRouter();

const value = reactive({ email: "", password: "" });

const register = async () => {
  await signUp(value.email, value.password);
  if (!errors.signIn) {
    await router.push("/");
  }
};
</script>

<template lang="pug">
QForm(@submit="register" label-position="top" )
  h3( class="q-ma-none" ) Register
  QInput(
    id="email-register"
    type="text"
    class="w-full"
    v-model="value.email"
    :label="$t('Email')")
  QInput(
    id="password-register"
    v-model="value.password"
    class="w-full"
    type="password"
    :label="$t('Password')" )
  QBtn(
    type="submit"
    color="primary"
    :label="$t('Register')"
    @click="register"
    :loading="loadings.signUp"
    class="q-mt-sm"
  )
</template>
