<script lang="ts" setup>
import type { Hobby } from "@/types";
import { computed } from "vue";
import type { QTableProps } from "quasar";
import { useI18n } from "vue-i18n";

defineProps<{ hobbies: Hobby[] }>();

const { t } = useI18n();

const columns = computed<QTableProps["columns"]>(() => [
  {
    name: "name",
    label: t("Name"),
    field: (row: Hobby) => row.name,
    align: "left",
  },
  {
    name: "category",
    label: t("Category"),
    field: (row: Hobby) => row.category,
    align: "left",
  },
  {
    name: "status",
    label: t("Status"),
    field: (row: Hobby) => row.status,
    align: "left",
  },
  {
    name: "startDate",
    label: t("StartDate"),
    field: (row: Hobby) => row.startDate,
    format: (val: Date) => val.toDateString(),
    align: "left",
  },
]);
</script>

<template lang="pug">
div
  QTable(
    :title="$t('Hobbies')"
    :rows="hobbies"
    :columns="columns"
    row-key="id" )
</template>
