export const getTimeString = (time: number) => {
  let timeString = `0${time}`;
  if (time >= 10) {
    timeString = time.toString();
  }
  return timeString
}