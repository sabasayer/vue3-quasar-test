<script lang="ts" setup>
import { useHobby } from "@/stores/hobby";
import { defineAsyncComponent } from "vue";
import HobbyCard from "./HobbyCard.vue";
import { storeToRefs } from "pinia";
import type { Hobby } from "@/types";

const HobbyTable = defineAsyncComponent(() => import("./HobbyTable.vue"));

const emit = defineEmits<{ (e: "edit", value: Hobby): void }>();

const store = useHobby();
const { loadings, errors, hobbies } = storeToRefs(store);
const { get } = store;
await get();

const edit = (data: Hobby) => emit("edit", data);
</script>

<template lang="pug">
div(class="q-py-md")
  QLinearProgress(v-if="loadings.get" indeterminate)
  p(v-if="errors.get" class="text-red") {{ errors.get }}
  div( class="row q-gutter-md" )
    HobbyCard( v-for="data in hobbies"
      :key="data.id"
      :data="data"
      @edit="edit")

  HobbyTable(v-if="hobbies.length" :hobbies="hobbies" class="q-mt-xl")
</template>
