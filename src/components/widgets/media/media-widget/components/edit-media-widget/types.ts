import { ListMediaOutput } from "../../../../../../lib/pelican/media/list-media";

export type EditMediaWidgetInput = {
  media: ListMediaOutput["media"]["media"][number];
  onCancel?: () => void;
  onSave?: () => void;
};
