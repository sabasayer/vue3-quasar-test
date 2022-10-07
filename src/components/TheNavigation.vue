<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { type RouteLocationRaw, useRoute, useRouter } from "vue-router";
import { computed } from "vue";

const { t } = useI18n();
const router = useRouter();
const route = useRoute();

const links = computed(() => [
  { label: t("Home"), route: "/", icon: "home", active: route.name === "home" },
  {
    label: t("Calendar"),
    route: { name: "calendar" },
    icon: "date_range",
    active: route.name === "calendar",
  },
]);

const goToLink = (to: RouteLocationRaw) => router.push(to);
</script>

<template lang="pug">
QScrollArea( class="fit" )
  QList
    QItem( v-for="link in links"
      :key="link.label"
      clickable
      v-ripple
      :active="link.active"
      @click="goToLink(link.route)" )
      QItemSection( avatar )
        QIcon( :name="link.icon" )
      QItemSection {{ link.label }}
</template>

<style lang="scss">
#main-nav {
  a {
    text-decoration: none;
    display: inline-block;
    width: 100%;
    button {
      @apply text-white;
    }
    &.router-link-exact-active {
      button {
        @apply text-blue-500;
      }
    }
  }
}
</style>
