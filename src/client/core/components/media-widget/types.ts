import type {
  MediaModelsMedia,
  MediaOrderByInput,
} from "../../../../common/apis/pelican/types";

export type MediaWidgetDisplayState = {
  state: "display";
};

export type MediaWidgetEditState = {
  media: Omit<MediaModelsMedia, "bindings">;
  state: "edit";
};

export type MediaWidgetUploadState = {
  state: "upload";
};

export type MediaWidgetState =
  | MediaWidgetDisplayState
  | MediaWidgetEditState
  | MediaWidgetUploadState;

export type MediaWidgetInput = {
  limit: number;
  order: MediaOrderByInput;
};
