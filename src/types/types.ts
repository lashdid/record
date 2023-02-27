import type { NoSerialize } from "@builder.io/qwik"

export interface TimeProps {
  seconds: number
  minutes: number
}

export interface TextStateProps {
  error: string
  caption: string
  link: string
}

export interface RecorderProps {
  media: NoSerialize<MediaRecorder> | null
  state: "stream" | "start" | "stop"
  mediaBlobs: NoSerialize<Blob[]> | []
  time: TimeProps
}
