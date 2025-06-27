import {
  UsePlaylistAddFormValidators,
  UsePlaylistAddFormValues,
} from "./hooks/forms/use-playlist-add-form";

export type PlaylistAddFormData = UsePlaylistAddFormValues;

export type PlaylistAddFormErrors = {
  [K in keyof UsePlaylistAddFormValues]?: string;
};

export type PlaylistAddFormValidators = UsePlaylistAddFormValidators;

export type PlaylistAddFormInput = {
  onAdd?: (
    data: PlaylistAddFormData,
  ) => Promise<null | PlaylistAddFormErrors | undefined>;
  validate?: PlaylistAddFormValidators;
};
