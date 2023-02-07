import { component$, Signal, useStylesScoped$ } from '@builder.io/qwik';
import styles from './video.css?inline';

interface VideoProps {
  videoRef: Signal<HTMLVideoElement | undefined>
}

export default component$((props: VideoProps) => {
  useStylesScoped$(styles);

  return (
    <>
      <div class='video-container'>
        <div class='overlay'/>
        <video ref={props.videoRef} autoPlay/>
      </div>
    </>
  );
});
