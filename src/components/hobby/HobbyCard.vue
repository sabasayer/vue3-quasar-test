<script lang="ts" setup>
import type { Hobby, StatusType } from "@/types";
import { defineProps, unref } from "vue";
import { useHobby } from "@/stores/hobby";
import { computed } from "vue";
import { statusIconMap, StatusList } from "@/utils/consts";
import { useI18n } from "vue-i18n";

const props = defineProps<{ data: Hobby; horizontal?: boolean }>();
const emit = defineEmits<{ (e: "edit", value: Hobby): void }>();

const { remove, save, loadings } = useHobby();
const { t } = useI18n({ inheritLocale: true });

const removeHobby = async () => {
  await remove(unref(props.data));
};

const edit = () => emit("edit", props.data);
const changeStatus = async (status: StatusType) => {
  await save({ ...props.data, status });
};
const statusIcon = computed(() => statusIconMap[props.data.status]);

const statusOptions = computed(() =>
  StatusList.filter((e) => e !== props.data.status).map((e) => ({
    label: t(`status.${e}`),
    icon: statusIconMap[e],
    command: () => changeStatus(e),
  }))
);
</script>

<template lang="pug">
QCard
  QCardSection
    h5( class="q-ma-none text-gray-600")  {{ data.name }}
  QCardSection( :class="{ 'flex gap-3': horizontal }" )
    div( class="row items-center" )
      QIcon( :name="statusIcon" class="q-mr-sm")
      span {{ data.status }}
    div {{ data.category }}
    div {{ data.startDate.toDateString() }}
  QCardActions
    QBtn(
      :loading="loadings.save" :label="$t('ChangeStatus')" flat icon="keyboard_arrow_down")
      QMenu
        QList
          QItem( v-for="item in statusOptions" :key="item.label" clickable v-close-popup @click="item.command()" )
            QItemSection( avatar )
              QIcon( :name="item.icon" )
            QItemSection
              span {{item.label}}
    QBtn(
      icon="edit"
      @click="edit"
      flat) {{ $t('Edit') }}
    QBtn(
      icon="delete"
      :loading="loadings.remove"
      color="red"
      flat
      @click="removeHobby" ) {{ $t('Remove') }}
</template>
