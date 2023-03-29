import type { RecorderProps, TextStateProps, TimeProps } from "~/types";
import { getTimeString } from "~/utils/getTimeString";

export async function getScreen(
  mediaType: string,
  onSuccess: (res: MediaStream, mime: string, isSupported: boolean) => void,
  onError: (err: any) => void
) {
  await navigator.mediaDevices
    .getDisplayMedia({
      video: true,
    })
    .then((res) => {
      let mime, isSupported;
      if(MediaRecorder.isTypeSupported(`video/${mediaType}; codecs=h264`)){
        mime = `video/${mediaType}; codecs=h264`
        isSupported = true
      }
      else {
        mime = `video/${mediaType}`;
        isSupported = false
      }
      onSuccess(res, mime, isSupported);
    })
    .catch((err) => {
      onError(err);
    });
}

export function createTimeInterval(
  time: TimeProps,
  callback: (timeString: string) => void
) {
  return setInterval(() => {
    time.seconds++;
    if (time.seconds > 59) {
      time.seconds = 0;
      time.minutes++;
    }
    const secondString = getTimeString(time.seconds);
    const minuteString = getTimeString(time.minutes);
    callback(`${minuteString}:${secondString}`);
  }, 1000);
}

export function resetRecorder(
  recorder: RecorderProps,
  textState: TextStateProps
) {
  recorder.mediaBlobs = [];
  recorder.state = "stream";
  textState.caption = "Free Online Screen Recorder";
  textState.error = 'Please "Allow" us to see your screen';
}

export function resetVideo(recorder: RecorderProps){
  const { time } = recorder;
  time.seconds = 0;
  time.minutes = 0;
  recorder.mediaBlobs = []
}

export function generateVideo(recorder: RecorderProps) {
  const { time } = recorder;
  time.seconds = 0;
  time.minutes = 0;
  const blob = new Blob(recorder.mediaBlobs, {
    type: recorder.mediaBlobs![0].type,
  });
  recorder.mediaBlobs = [];
  return URL.createObjectURL(blob);
}

export function defaultName() {
  const seconds = new Date().valueOf();
  return `RecorD-${seconds}`
}