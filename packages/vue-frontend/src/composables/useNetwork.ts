import { ref } from "vue";
import type { Ref } from "vue";
import { destr } from "destr";


type SocketEvent = {
  event: string;
  data: any;
};

type UseNetwork = {
  isOnline: Ref<boolean>;
  send: (event: string, data?: any) => void;
  connect: () => void;
  disconnect: () => void;
  on: (event: string, callback: (data: any) => void) => void;
};

let socket: WebSocket | null = null;
const BASE_URL = `${import.meta.env.VITE_BACKEND_WS}/ws`;
const eventListeners = new Map();

export default (): UseNetwork => {
  const isOnline = ref(true);

  function on(event: string, callback: (data: any) => void) {
    eventListeners.set(event, callback);
  }

  function send(event: string, data?: any) {
    if (!socket) {
      connect();
      return;
    }
    socket.send(JSON.stringify({ event, data }));
  }

  function connect() {
    socket = new WebSocket(BASE_URL);

    socket.onopen = () => {
      isOnline.value = true;
    };

    socket.onmessage = (message) => {
      const event = destr<SocketEvent>(message.data);

      const listener = eventListeners.get(event.event);
      if (listener) {
        listener(event.data);
      }
    };
  }

  function disconnect() {
    if (!socket) {
      return;
    }
    socket.close();
  }

  return {
    isOnline,
    send,
    connect,
    disconnect,
    on,
  };
};
