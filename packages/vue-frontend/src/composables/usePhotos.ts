type PhotoService = {
  print: (id: string) => void;
  remove: (id: string) => void;
  getAll: () => Promise<{ ids: string[] }>;
  take: () => Promise<{ id: string }>;
};

export function usePhotos(): PhotoService {
  const BASE_URL = "http://localhost:3001/photos";

  async function take(): Promise<{ id: string }> {
    const response = await fetch(`${BASE_URL}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  }

  async function print(id: string) {
    const data = { id };
    await fetch(`${BASE_URL}/print`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  async function remove(id: string) {
    const data = { id };
    await fetch(`${BASE_URL}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  async function getAll(): Promise<{ ids: [string] }> {
    const response = await fetch(`${BASE_URL}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  }

  return {
    print,
    remove,
    getAll,
    take,
  };
}
