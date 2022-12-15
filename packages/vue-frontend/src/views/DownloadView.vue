<script lang="ts" setup>
import { Icon } from "@iconify/vue/dist/offline";
import BaseButton from "@/components/BaseButton.vue";
import ButtonBar from "@/components/ButtonBar.vue";
import { onMounted, ref } from "vue";
import QRCode from "qrcode";
import { useRouter, useRoute } from "vue-router";

const wifiQR = ref();
const imageQR = ref();

const props = defineProps({
  imageId: { type: String, required: true },
});

const generateQR = async (text: string) => {
  try {
    return await QRCode.toDataURL(text);
  } catch (err) {
    console.error(err);
  }
};

const imageUrl = `http://fotobox.local/pd/${props.imageId}`;

onMounted(async () => {
  wifiQR.value = await generateQR("WIFI:T:WPA;S:raspi-webgui;P:ChangeMe;;");
  imageQR.value = await generateQR(imageUrl);
});

const router = useRouter();
function handleBack() {
  router.go(-1);
}
</script>

<template>
  <div class="download">
    <h1 class="download__title">Foto auf dein Smartphone herunterladen</h1>
    <div class="download__main">
      <div class="download__step">1</div>
      <div class="download__description">
        <h2>Verbinde dich mit der Fotobox</h2>
        <div>
          Scanne dafür den QRCode oder verbinde dich manuell mit dem WLAN
        </div>
      </div>

      <div>
        <img :src="wifiQR" alt="qr-code" class="download__qr" />
        <div class="download__manuell">
          <div>SSID: raspi-webgui</div>
          <div>Passwort: ChangeMe</div>
        </div>
      </div>

      <div class="download__step">2</div>
      <div class="download__description">
        <h2>Besuche die Seite um dir das Bild zu speichern</h2>
        <div>
          Scanne dafür den QRCode oder öffne die URL in einem Browser manuell
        </div>
      </div>

      <div>
        <img :src="imageQR" alt="qr-code" class="download__qr" />
        <div>
          <div>{{ imageUrl }}</div>
        </div>
      </div>

      <div class="download__step">3</div>
      <div class="download__description">
        <h2>Trenne wieder die WLAN-Verbindung zur Fotobox</h2>
        <div>Deaktiviere das WLAN an deinem Smartphone</div>
      </div>
    </div>
    <div class="download__footer">
      <ButtonBar justify-content="space-between">
        <template #middle>
          <BaseButton @click="handleBack">
            <Icon
              icon="mdi:arrow-left-bold"
              color="white"
              width="42px"
              height="42px"
            />
          </BaseButton>
          <BaseButton to="/">
            <Icon icon="mdi:home" color="white" width="42px" height="42px" />
          </BaseButton>
        </template>
      </ButtonBar>
    </div>
  </div>
</template>

<style lang="scss">
.download {
  padding: 20px;
  height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;

  &__title {
    margin: 0;
  }

  &__qr {
    width: 150px;
    height: auto;
  }
  &__main {
    flex: 1;
    display: grid;
    align-items: center;
    justify-items: center;
    gap: 20px;

    grid-template-columns: 40px auto auto;
    grid-template-rows: auto auto auto;
  }

  &__description {
    justify-self: start;

    > * {
      margin: 0;
      text-align: left;
    }
  }

  &__step {
    color: white;
    font-weight: bold;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
    background-color: var(--base-button-background);
    padding: 1rem;
  }

  &__manuell {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  &__footer {
    margin-top: 3rem;
  }
}
</style>
