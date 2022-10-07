<script setup lang="ts">
import type { Hobby } from "@/types";
import { ref } from "vue";
import HobbyList from "../components/hobby/HobbyList.vue";
import NewHobbyForm from "../components/hobby/NewHobbyForm.vue";

const isModalVisible = ref(false);
const editingHobby = ref<Hobby | undefined>();

const open = () => (isModalVisible.value = true);
const close = () => (isModalVisible.value = false);

const edit = (data: Hobby) => {
  editingHobby.value = data;
  open();
};
</script>

<template lang="pug">
QPage( padding )
  QToolbar( class="bg-accent text-white" )
    QToolbarTitle {{ $t("Hobbies") }}
    QBtn( @click="open" flat icon="add") {{ $t('AddNewHobby') }}
  HobbyList(@edit="edit")
  QDialog(v-model="isModalVisible")
    QCard
      QCardSection
        NewHobbyForm(@submitted="close" :editing-hobby="editingHobby")
</template>
