import dayjs from "../../dayjs";

export function getDurationInSeconds(duration: string) {
  return dayjs.duration(duration).asSeconds();
}
