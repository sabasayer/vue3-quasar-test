<script setup lang="ts">
import { useAuth } from "@/stores/auth";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const { signIn, errors, loadings } = useAuth();
const router = useRouter();

const value = reactive({ email: "", password: "" });

const login = async () => {
  await signIn(value.email, value.password);
  if (!errors.signIn) {
    await router.push("/");
  }
};
</script>

<template lang="pug">
QForm(@submit.prevent="login" label-position="top" )
  h3 Login
  QInput(id="email" type="text" class="w-full" v-model="value.email" :label="$t('Email')")
  QInput(
    id="password"
    v-model="value.password"
    type="password"
    class="w-full"
    :label="$t('Password')"
    )
  QBtn(
    type="submit"
    @click="login"
    :loading="loadings.signIn"
    :label="$t('Login')"
    color="primary"
    class="q-mt-sm"
    )
  div(v-if="errors.signIn" class="q-mt-3" :title="errors.signIn")
</template>
