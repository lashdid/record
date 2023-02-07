import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import MainButton from "~/components/main-button/main-button";
import Title from "~/components/title/title";
import Video from "~/components/video/video";

export default component$(() => {
  const video = useSignal<HTMLVideoElement>();
  return (
    <section>
      <Title />
      <MainButton onClick$={async () => {
        await navigator.mediaDevices.getDisplayMedia().then((res) => {
          const videoSrc = video.value
          videoSrc!.srcObject = res
          console.log(videoSrc)
        })
      }}>Start Recording</MainButton>
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
