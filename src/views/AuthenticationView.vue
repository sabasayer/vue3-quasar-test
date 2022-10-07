<script setup lang="ts">
import TheLogin from "../components/auth/TheLogin.vue";
import TheRegister from "../components/auth/TheRegister.vue";
</script>

<template lang="pug">
div(class="row items-center justify-center window-height bg-grey-2")
  div(class="col-md-6 col-12 row q-gutter-xl bg-white shadow-2 q-py-lg q-pr-xl border-round")
    TheRegister(class="col")
    TheLogin(class="col")
</template>
