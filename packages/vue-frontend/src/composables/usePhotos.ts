import { ofetch } from "ofetch";

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

//TODO: HTTP für handy https für tablet
export function usePhotos(https = true): PhotoService {
  let BASE_URL = `${import.meta.env.VITE_BACKEND_HTTP}/photos`;
  if (https) {
    BASE_URL = `${import.meta.env.VITE_BACKEND}/photos`;
  }

  async function take(): Promise<PhotoId> {
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
