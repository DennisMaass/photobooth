import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "@/shared.scss";

import { addIcon } from "@iconify/vue/offline";
import homeIcon from "@iconify-icons/mdi/home";
import arrowLeftIcon from "@iconify-icons/mdi/arrow-left-bold";
import pictureIcon from "@iconify-icons/mdi/picture";
import printIcon from "@iconify-icons/fluent/print-20-filled";
import downloadIcon from "@iconify-icons/mdi/tray-arrow-down";
import imageIcon from "@iconify-icons/mdi/image";

addIcon("mdi:home", homeIcon);
addIcon("mdi:picture", pictureIcon);
addIcon("mdi:arrow-left-bold", arrowLeftIcon);
addIcon("fluent:print-20-filled", printIcon);
addIcon("mdi:tray-arrow-down", downloadIcon);
addIcon("mdi:image", imageIcon);

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
