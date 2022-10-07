<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template lang="pug">
Suspense
  RouterView
  template(#fallback) Loading...
</template>
