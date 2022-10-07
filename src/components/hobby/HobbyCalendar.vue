<script lang="ts" setup>
import type { Hobby } from "@/types";

defineProps<{ hobbies: Hobby[] }>();
</script>

<template lang="pug">
div
  h2 {{ $t("Calendar") }}
</template>
