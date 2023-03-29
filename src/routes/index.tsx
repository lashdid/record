import {
  component$,
  $,
  useSignal,
  useStore,
  noSerialize,
  useClientEffect$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Caption from "~/components/caption/caption";
import Error from "~/components/error/error";
import MainButton from "~/components/main-button/main-button";
import Modal from "~/components/modal/modal";
import RecordButton from "~/components/record-button/record-button";
import Title from "~/components/title/title";
import Video from "~/components/video/video";
import type { RecorderProps, TextStateProps } from "~/types";
import {
  createTimeInterval,
  generateVideo,
  getScreen,
  resetRecorder,
  resetVideo,
} from "~/utils/functions";

export default component$(() => {
  const video = useSignal<HTMLVideoElement>();
  const textState = useStore<TextStateProps>({
    error: "",
    caption: "Free Online Screen Recorder",
    link: "",
  });
  const recorder = useStore<RecorderProps>({
    media: null,
    state: "stream",
    mediaBlobs: [],
    time: {
      seconds: 0,
      minutes: 0,
    },
  });
  const fileFormats = useSignal(["webm", "mp4"]);
  const isModalOpen = useSignal(false);
  useClientEffect$(({ track, cleanup }) => {
    track(() => recorder.state);
    const { state, time } = recorder;
    let interval: NodeJS.Timeout | null = null;
    if (state === "stop") {
      interval = createTimeInterval(time, (timeString) => {
        textState.caption = timeString;
      });
    }
    cleanup(() => clearInterval(interval!));
  });

  const setRecorder = $(async () => {
    await getScreen(
      fileFormats.value[0],
      (res, mime, isSupported) => {
        const setRecorder = new MediaRecorder(res, {
          mimeType: mime,
        });
        if (!isSupported) fileFormats.value = ["webm"];
        recorder.media = noSerialize(setRecorder);
        video!.value!.srcObject = res;
        recorder.state = "start";
        textState.caption = "00:00";
        textState.error = "";
      },
      () => {
        textState.error = 'Please "Allow" us to see your screen';
      }
    );
  });

  const startRecord = $(() => {
    const { media } = recorder;
    if (!media?.stream.active) {
      resetRecorder(recorder, textState);
      return;
    }
    recorder.state = "stop";
    media?.start();
    media!.ondataavailable = (blob) => {
      if (!media?.stream.active) {
        resetRecorder(recorder, textState);
        return;
      }
      if (blob.data.size > 0) {
        recorder.mediaBlobs = noSerialize([...recorder.mediaBlobs!, blob.data]);
      }
    };
  });

  const stopRecord = $(() => {
    const { media } = recorder;
    recorder.state = "start";
    media?.stop();
    textState.caption = "00:00";
    isModalOpen.value = true;
  });

  const onDownload = $((name: string, type: string) => {
    const url = generateVideo(recorder);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${name}.${type}`;
    link.click();
    isModalOpen.value = false;
  });

  const onCancel = $(() => {
    isModalOpen.value = false
    resetVideo(recorder)
  })

  return (
    <section>
      {isModalOpen.value && (
        <Modal
          onDownload$={onDownload}
          onCancel$={onCancel}
          fileFormats={fileFormats.value}
        />
      )}
      <Title state={recorder.state} />
      <Caption type="h2">{textState.caption}</Caption>
      {recorder.state === "stream" && (
        <MainButton onClick$={setRecorder}>Start Recording</MainButton>
      )}
      {recorder.state === "start" && <RecordButton onClick$={startRecord} />}
      {recorder.state === "stop" && (
        <RecordButton state="stop" onClick$={stopRecord} />
      )}
      {recorder.state === "stream" && <Error>{textState.error}</Error>}
      <Video videoRef={video} />
    </section>
  );
});

export const head: DocumentHead = {
  title: "RecorD",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
