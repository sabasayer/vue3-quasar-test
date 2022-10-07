import { createApp } from "vue";
import { createPinia } from "pinia";
import { Quasar } from "quasar";

// Import icon libraries
import "@quasar/extras/roboto-font/roboto-font.css";
import "@quasar/extras/material-icons/material-icons.css";

// Import Quasar css
import "quasar/src/css/index.sass";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import { i18n } from "./localization";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);

app.use(Quasar, {
  plugins: ["Notify"], // import Quasar plugins and add here
});

app.mount("#app");
