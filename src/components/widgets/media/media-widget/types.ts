import {
  ListMediaInput,
  ListMediaOutput,
} from "../../../../lib/pelican/media/list-media";

export type MediaWidgetInput = {
  limit: NonNullable<ListMediaInput["limit"]>;
  media: ListMediaOutput["media"];
} & Omit<ListMediaInput, "limit">;

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
