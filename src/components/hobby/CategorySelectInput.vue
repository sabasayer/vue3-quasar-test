<script setup lang="ts">
import { getHobbyCategories } from "@/api";
import type { HobbyCategory } from "@/types";
import { reactive } from "vue";

const props = defineProps<{ modelValue: string }>();
const emit = defineEmits<{ (e: "update:modelValue", value: string): void }>();

const groups = reactive<Record<string, HobbyCategory[]>>({});

const categories = await getHobbyCategories();
categories.forEach((category) => {
  const group = groups[category.hobbyType];
  if (!group) groups[category.hobbyType] = [category];
  else group.push(category);
});

const isSelected = (category: string) => props.modelValue === category;
const select = (category: string) => emit("update:modelValue", category);
</script>

<template lang="pug">
div(class="row q-gutter-sm")
  template(v-for="(categories, type) in groups" :key="type")
    div
      label {{ type }}
      div(class="mt-4 flex flex-wrap gap-3")
        div( v-for="category in categories" :key="category.name" )
          QBtn(
            :color="isSelected(category.name) ? 'primary' : 'white'" :text-color="!isSelected(category.name) ? 'black' : 'white'"
            class="cursor-pointer border-1 border-300 "
            @click="select(category.name)") {{ category.name }}
</template>
