import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "@/shared.scss";

import { addIcon } from '@iconify/vue/offline';
import homeIcon from '@iconify-icons/mdi/home';
import arrowLeftIcon from '@iconify-icons/mdi/arrow-left-bold';
import pictureIcon from '@iconify-icons/mdi/picture';
import printIcon from '@iconify-icons/fluent/print-20-filled';
import qrIcon from '@iconify-icons/ic/twotone-qr-code-2';

addIcon('mdi:home', homeIcon);
addIcon('mdi:picture', pictureIcon);
addIcon('mdi:arrow-left-bold', arrowLeftIcon);
addIcon('fluent:print-20-filled', printIcon);
addIcon('ic:twotone-qr-code-2', qrIcon);


const app = createApp(App);
app.use(createPinia());
app.use(router);

app.mount("#app");
