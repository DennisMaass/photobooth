import { ref } from "vue";
import { ofetch } from "ofetch";
import useNotification from "@/composables/useNotification";
import useNetwork from "@/composables/useNetwork";

export type UsePrinter = {
  print: (id: string, withWatermark:boolean) => Promise<PrinterStatus>;
  getState: () => Promise<PrinterStatus>;
};

export type PrinterStatusCode = "ready" | "busy" | "error" | "off";
export type PrinterStatus = {
  code: PrinterStatusCode;
  message: string;
};

const lastPrint = ref<Date | null>(null);

export default (): UsePrinter => {
  const { fire } = useNotification();
  const { send } = useNetwork();

  const BASE_URL = `${import.meta.env.VITE_BACKEND}/printer`;

  async function getState(): Promise<PrinterStatus> {
    const status = await ofetch(`${BASE_URL}/state`, {
      method: "GET",
    });
    return status;
  }

  async function print(
    id: string,
    withWatermark = true
  ): Promise<PrinterStatus> {
    send("print", { id, withWatermark });

    const status = await ofetch(`${BASE_URL}/print`, {
      method: "POST",
      body: { id, withWatermark },
    });

    const intepretedStatus = status;

    const now = new Date().getTime();
    const lastPrintTime = lastPrint.value?.getTime() || 0;
    const timeSinceLastPrint = now - lastPrintTime;
    const twoMinutesSinceLastPrint = timeSinceLastPrint >= 1000 * 60 * 2;
    if (
      intepretedStatus.code === "busy" &&
      lastPrintTime > 0 &&
      twoMinutesSinceLastPrint
    ) {
      intepretedStatus.code = "error";
    }

    if (intepretedStatus.code === "ready") {
      lastPrint.value = new Date();
    }

    showNofication(intepretedStatus);

    return intepretedStatus;
  }

  function showNofication(status: PrinterStatus) {
    if (status.code === "ready") {
      fire({
        icon: "success",
        title: "Druck gestartet",
        text: "Dauert ca. 1 Minute und 30 Sekunden",
        showConfirmButton: false,
        timer: 3000,
      });
    } else if (status.code === "busy") {
      fire({
        icon: "info",
        title: "Druckt gerade",
        text: "Versuche es bitte später nochmal",
        timer: 10000,
      });
    } else if (status.code === "error") {
      fire({
        icon: "error",
        title: "Papier oder Farbpatrone leer",
        text: "bitte wechseln",
      });
    } else if (status.code === "off") {
      fire({
        icon: "error",
        title: "Drucker ist aus!",
        text: "Bitte anschalten",
        timer: 10000,
      });
    } else {
      fire({
        icon: "error",
        title: "Es ist ein Fehler aufgetreten",
      });
    }
  }

  return {
    print,
    getState,
  };
};
