import type {
  UseFormInitialValues,
  UseFormOnError,
  UseFormOnSubmit,
  UseFormSubmitInput,
  UseFormValues,
} from "../../../../../../isomorphic/core/hooks/use-form";
import type { Schemas } from "./schemas";

export type EditPlaylistFormSchema = typeof Schemas.Values;

export type EditPlaylistFormValues = UseFormValues<EditPlaylistFormSchema>;

export type EditPlaylistFormInitialValues =
  UseFormInitialValues<EditPlaylistFormSchema>;

export type EditPlaylistFormOnError = UseFormOnError;

export type EditPlaylistFormSubmitInput =
  UseFormSubmitInput<EditPlaylistFormSchema>;

export type EditPlaylistFormOnSubmit = UseFormOnSubmit<EditPlaylistFormSchema>;

export type EditPlaylistFormInput = {
  initialValues: EditPlaylistFormValues;
  onError?: EditPlaylistFormOnError;
  onSubmit: EditPlaylistFormOnSubmit;
};
