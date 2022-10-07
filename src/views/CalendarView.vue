<script lang="ts" setup>
import { defineAsyncComponent } from "vue";
import { storeToRefs } from "pinia";
import { useHobby } from "@/stores/hobby";

const HobbyCalendar = defineAsyncComponent(
  () => import("@/components/hobby/HobbyCalendar.vue")
);

const store = useHobby();
const { loadings, errors, hobbies } = storeToRefs(store);
const { get } = store;

get();
</script>

<template lang="pug">
QPage( padding )
  QLinearProgress(v-if="loadings.get" indeterminate)
  h1(v-if="errors.get" class="p-error") {{ errors.get }}
  HobbyCalendar(v-if="hobbies.length" :hobbies="hobbies" class="mt-3")
</template>
