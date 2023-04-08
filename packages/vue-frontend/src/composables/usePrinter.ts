import { ofetch } from "ofetch";

type UsePrinter = {
  print: (id: string) => Promise<PrinterStatus>;
};

type PrinterStatusCode = "ready" | "busy" | "error";
type PrinterStatus = {
  code: PrinterStatusCode;
  message: string;
};

export default (): UsePrinter => {
  const BASE_URL = `${import.meta.env.VITE_BACKEND}/photos`;

  async function print(id: string): Promise<PrinterStatus> {
    return await ofetch(`${BASE_URL}/print`, {
      method: "POST",
      body: { id },
    });
  }

  return {
    print,
  };
};
