import type { MediaModelsMedia } from "../../../../../../common/apis/pelican/types";
import type {
  EditMediaFormOnSubmit,
  EditMediaFormSubmitInput,
} from "./components/edit-media-form";

export type EditMediaWidgetSaveInput = EditMediaFormSubmitInput;

export type EditMediaWidgetInput = {
  media: Omit<MediaModelsMedia, "bindings">;
  onBack?: () => void;
  onSave: EditMediaFormOnSubmit;
};
