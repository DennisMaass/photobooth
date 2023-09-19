import { ofetch } from "ofetch";
import useNetwork from "@/composables/useNetwork";

type PhotoService = {
  remove: (id: string) => void;
  getAll: () => Promise<{ ids: string[] }>;
  take: () => Promise<{ id: string }>;
};

type PhotoIdList = {
  ids: string[];
};

type PhotoId = {
  id: string;
};

//TODO: HTTP for phone https for tablet
export function usePhotos(https = true): PhotoService {
  let BASE_URL = `${import.meta.env.VITE_BACKEND_HTTP}/photos`;
  if (https) {
    BASE_URL = `${import.meta.env.VITE_BACKEND}/photos`;
  }

  const { send } = useNetwork();

  async function take(): Promise<PhotoId> {
    send("takePhoto");

    return await ofetch(`${BASE_URL}/`, {
      method: "POST",
    });
  }

  async function remove(id: string) {
    const data = { id };
    await ofetch(`${BASE_URL}`, {
      method: "DELETE",
      body: data,
    });
  }

  async function getAll(): Promise<PhotoIdList> {
    return await ofetch(`${BASE_URL}/`, {
      method: "GET",
    });
  }

  return {
    remove,
    getAll,
    take,
  };
}
