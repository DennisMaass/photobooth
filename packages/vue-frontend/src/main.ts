import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "@/shared.scss";
const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
