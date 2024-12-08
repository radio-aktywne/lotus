import {
  UsePlaylistFormValidators,
  UsePlaylistFormValues,
} from "../../../../../../hooks/forms/use-playlist-form";

export type CreatePlaylistFormData = UsePlaylistFormValues;

export type CreatePlaylistFormErrors = {
  [K in keyof UsePlaylistFormValues]?: string;
};

export type CreatePlaylistFormValidators = UsePlaylistFormValidators;

export type CreatePlaylistFormInput = {
  onCreate?: (
    data: CreatePlaylistFormData,
  ) => Promise<CreatePlaylistFormErrors | null | undefined>;
  validate?: CreatePlaylistFormValidators;
};
