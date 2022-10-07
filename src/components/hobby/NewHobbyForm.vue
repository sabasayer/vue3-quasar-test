<script setup lang="ts">
import type { Hobby } from "@/types";
import { computed, ref, watch } from "vue";
import CategorySelectInput from "./CategorySelectInput.vue";
import { useHobby } from "@/stores/hobby";

const { statusList, save, loadings, errors } = useHobby();

const emit = defineEmits<{ (e: "submitted"): void }>();
const props = defineProps<{ editingHobby?: Hobby }>();

const submitted = ref(false);
const hobby = ref<Hobby>(
  props.editingHobby
    ? { ...props.editingHobby }
    : {
        name: "",
        category: "",
        startDate: new Date(),
        status: "planning",
      }
);

watch(
  () => props.editingHobby,
  () => {
    if (props.editingHobby) {
      hobby.value = props.editingHobby;
    }
  }
);

const statusOptions = computed(() =>
  statusList.map((e) => ({
    label: e.name,
    value: e.code,
  }))
);

const handleSubmit = async () => {
  submitted.value = true;

  await save(hobby.value);
  console.log(errors.save);
  if (!errors.save) {
    console.log("saved");
    emit("submitted");
  }
};
</script>

<template lang="pug">
QForm(
  @submit="handleSubmit"
  )
  h4 {{ $t('Category') }}
    CategorySelectInput(
      v-model="hobby.category")
  QInput(
    v-model="hobby.name"
    :label="$t('Name')"
    class="w-full"
    :rules="[val => val || 'Name is required']" )
  h6( class="q-my-sm" ) {{ $t('StartDate') }}
  QBtnToggle(
    v-model="hobby.status"
    toggle-color="primary"
    :options="statusOptions"
    )
  QInput( v-model="hobby.startDate" mask="date" :rules="['date']"
    :label="$t('StartDate')"
  )
    template( #append )
      QIcon( name="event" class="cursor-pointer" )
        QPopupProxy( cover transition-show="scale" transition-hide="scale")
          QDate( v-model="hobby.startDate" )
            div( class="row items-center justify-end" )
                QBtn( v-close-popup label="Close" color="primary" flast )
  div( class="flex justify-content-end pt-3" )
    QBtn(
      type="submit"
      color="primary"
      :icon="editingHobby ? 'save' : 'add'"
      :loading="loadings.save" ) {{ editingHobby ? $t('Update') : $t('Create') }}
</template>
