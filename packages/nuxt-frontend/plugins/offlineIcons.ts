
import { addIcon } from "@iconify/vue/offline";
import homeIcon from "@iconify-icons/mdi/home";
import arrowLeftIcon from "@iconify-icons/mdi/arrow-left-bold";
import cameraIcon from "@iconify-icons/mdi/camera";
import cogIcon from "@iconify-icons/mdi/cog";
import printIcon from "@iconify-icons/fluent/print-20-filled";
import downloadIcon from "@iconify-icons/mdi/tray-arrow-down";
import imageIcon from "@iconify-icons/mdi/image";
import plusIcon from "@iconify-icons/mdi/plus";
import minusIcon from "@iconify-icons/mdi/minus";
import themeIcon from "@iconify-icons/mdi/theme";
import accountLockIcon from "@iconify-icons/mdi/account-lock";


export default defineNuxtPlugin(nuxtApp => {
    addIcon("mdi:home", homeIcon);
    addIcon("mdi:arrow-left-bold", arrowLeftIcon);
    addIcon("fluent:print-20-filled", printIcon);
    addIcon("mdi:tray-arrow-down", downloadIcon);
    addIcon("mdi:image", imageIcon);
    addIcon("mdi:camera", cameraIcon);
    addIcon("mdi:cog", cogIcon);
    addIcon("mdi:plus", plusIcon);
    addIcon("mdi:minus", minusIcon);
    addIcon("mdi:theme", themeIcon);
    addIcon("mdi:account-lock", accountLockIcon);
})