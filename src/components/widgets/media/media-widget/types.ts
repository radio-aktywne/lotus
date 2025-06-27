import {
  ListMediaInput,
  ListMediaOutput,
} from "../../../../lib/pelican/media/list-media";

export type MediaWidgetInput = {
  media: ListMediaOutput["media"];
} & ListMediaInput;

export type MediaWidgetDisplayState = {
  state: "display";
};

export type MediaWidgetEditState = {
  media: MediaWidgetInput["media"]["media"][number];
  state: "edit";
};

export type MediaWidgetUploadState = {
  state: "upload";
};

export type MediaWidgetState =
  | MediaWidgetDisplayState
  | MediaWidgetEditState
  | MediaWidgetUploadState;
