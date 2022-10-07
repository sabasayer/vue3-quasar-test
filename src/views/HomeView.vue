<script setup lang="ts">
import TheNavigation from "@/components/TheNavigation.vue";
import { ref } from "vue";

const leftDrawerOpen = ref(true);
const toggleLeftDrawer = () => (leftDrawerOpen.value = !leftDrawerOpen.value);
</script>

<template lang="pug">
QLayout( view="hHh lpR fFf" )
  QHeader( elevated class="bg-primary text-white" )
    QToolbar
      QBtn( dense flat round icon="menu" @click="toggleLeftDrawer" )
      QToolbarTitle
        QAvatar
          img( src="../assets/logo.svg" )
  QDrawer( show-if-abover v-model="leftDrawerOpen" side="left" :width="200" bordered )
    TheNavigation
  QPageContainer
    RouterView
</template>
