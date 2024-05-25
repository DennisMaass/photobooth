type PhotoIdList = {
  ids: string[];
};

type PhotoId = {
  id: string;
};

//TODO: HTTP for phone https for tablet
export default (https = true) => {
  const config = useRuntimeConfig();

  let BASE_URL = `${config.public.backendHttp}/photos`;
  if (https) {
    BASE_URL = `${config.public.backend}/photos`;
  }

  const { send } = useNetwork();

  async function take(): Promise<PhotoId> {
    send("takePhoto");

    return await $fetch(`${BASE_URL}/`, {
      method: "POST",
    });
  }

  async function remove(id: string) {
    const data = { id };
    await $fetch(`${BASE_URL}`, {
      method: "DELETE",
      body: data,
    });
  }

  async function getAll(): Promise<PhotoIdList> {
    return await $fetch(`${BASE_URL}/`);
  }

  return {
    remove,
    getAll,
    take,
  };
}
