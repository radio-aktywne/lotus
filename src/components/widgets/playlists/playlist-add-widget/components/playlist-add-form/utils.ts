import { UseListMediaSuccessState } from "../../../../../../hooks/pelican/media/use-list-media/types";

export function getMediaLabel(
  media: UseListMediaSuccessState["data"]["media"][number],
) {
  return media.name;
}
