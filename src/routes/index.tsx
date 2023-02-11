import { component$, $, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Caption from "~/components/caption/caption";
import Error from "~/components/error/error";
import MainButton from "~/components/main-button/main-button";
import RecordButton from "~/components/record-button/record-button";
import Title from "~/components/title/title";
import Video from "~/components/video/video";

export default component$(() => {
  const video = useSignal<HTMLVideoElement>();
  const error = useSignal<string>('')
  const caption = useSignal<string>('Free Online Screen Recorder')
  // const recorder = useSignal<MediaRecorder>()
  const recordState = useSignal<'stream' | 'start' | 'stop'>('stream')
  const getScreen = $(async () => {
    await navigator.mediaDevices.getDisplayMedia({
      video: true
    }).then((res) => {
      // recorder.value = new MediaRecorder(res, {
      //   mimeType: 'video/webm'
      // })
      video!.value!.srcObject = res
      recordState.value = 'start'
      caption.value = '00:00'
      error.value = ''
    }).catch((err) => {
      error.value = 'Please "Allow" us to see your screen'
      console.log(err)
    })
  })

  const startRecord = $(() => {
    // recorder.value?.start()
    recordState.value = 'stop'
  })

  const stopRecord = $(() => {
    // recorder.value?.stop()
    recordState.value = 'start'
  })

  return (
    <section>
      <Title state={recordState}/>
      <Caption>{caption.value}</Caption>
      {recordState.value === 'stream' && <MainButton onClick$={getScreen}>Start Recording</MainButton>}
      {recordState.value === 'start' && <RecordButton onClick$={startRecord}/>}
      {recordState.value === 'stop' && <RecordButton type="stop" onClick$={stopRecord}/>}
      <Error>{error.value}</Error>
      <Video videoRef={video}/>
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
