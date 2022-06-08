import type { Ref } from "vue";
import { ref } from "vue";

type CameraService = {
  stream: Ref<MediaStream | null>;
  start: () => Promise<MediaStream>;
  stop: () => void;
};

const stream = ref<MediaStream | null>(null);

export function useCamera(): CameraService {
  async function start(): Promise<MediaStream> {
    const constraints = {
      audio: false,
      video: true,
    };
    console.debug("[useCamera][start] constraints", constraints);
    stream.value = await navigator.mediaDevices.getUserMedia(constraints);
    return stream.value;
  }

  function stop() {
    console.debug("[useCamera][stop]");
    const camTracks = stream.value?.getTracks();
    if (!camTracks) {
      console.debug("[useCamera][stop] no camTracks to stop");
      return;
    }

    camTracks.forEach((track: MediaStreamTrack) => {
      track.stop();
    });
  }

  return {
    stream,
    start,
    stop,
  };
}
