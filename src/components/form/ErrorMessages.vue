<script lang="ts" setup>
import type { ErrorObject } from "@vuelidate/core";
defineProps<{ errors: ErrorObject[] }>();
</script>

<template lang="pug">
small(v-for="error in errors" :key="error.$uid" class="text-red-400") {{ error.$message }}
</template>
