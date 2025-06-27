import {
  UsePlaylistFormInitialValues,
  UsePlaylistFormValidators,
  UsePlaylistFormValues,
} from "../../../../../../hooks/forms/use-playlist-form";

export type EditPlaylistFormInitialData = UsePlaylistFormInitialValues;

export type EditPlaylistFormData = UsePlaylistFormValues;

export type EditPlaylistFormErrors = {
  [K in keyof UsePlaylistFormValues]?: string;
};

export type EditPlaylistFormValidators = UsePlaylistFormValidators;

export type EditPlaylistFormInput = {
  initialData: EditPlaylistFormInitialData;
  onSave?: (
    data: EditPlaylistFormData,
  ) => Promise<EditPlaylistFormErrors | null | undefined>;
  validate?: EditPlaylistFormValidators;
};
