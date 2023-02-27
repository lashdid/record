import { RecorderProps, TextStateProps, TimeProps } from "~/types";
import { getTimeString } from "~/utils/getTimeString";

export async function getScreen(
  mediaType: string,
  onSuccess: (res: MediaStream, mime: string) => void,
  onError: (err: any) => void
) {
  await navigator.mediaDevices
    .getDisplayMedia({
      video: true,
    })
    .then((res) => {
      const mime = MediaRecorder.isTypeSupported(
        `video/${mediaType}; codecs=vp9`
      )
        ? `video/${mediaType}; codecs=vp9`
        : `video/${mediaType}`;
      onSuccess(res, mime);
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

export function generateVideo(recorder: RecorderProps) {
  const { time } = recorder;
  let { mediaBlobs } = recorder;
  time.seconds = 0;
  time.minutes = 0;
  const blob = new Blob(mediaBlobs, {
    type: mediaBlobs![0].type,
  });
  mediaBlobs = [];
  return URL.createObjectURL(blob);
}
