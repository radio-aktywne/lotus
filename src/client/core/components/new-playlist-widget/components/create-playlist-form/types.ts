import type {
  UseFormInitialValues,
  UseFormOnError,
  UseFormOnSubmit,
  UseFormSubmitInput,
  UseFormValues,
} from "../../../../../../isomorphic/core/hooks/use-form";
import type { Schemas } from "./schemas";

export type CreatePlaylistFormSchema = typeof Schemas.Values;

export type CreatePlaylistFormValues = UseFormValues<CreatePlaylistFormSchema>;

export type CreatePlaylistFormInitialValues =
  UseFormInitialValues<CreatePlaylistFormSchema>;

export type CreatePlaylistFormOnError = UseFormOnError;

export type CreatePlaylistFormSubmitInput =
  UseFormSubmitInput<CreatePlaylistFormSchema>;

export type CreatePlaylistFormOnSubmit =
  UseFormOnSubmit<CreatePlaylistFormSchema>;

export type CreatePlaylistFormInput = {
  initialValues: CreatePlaylistFormValues;
  onError?: CreatePlaylistFormOnError;
  onSubmit: CreatePlaylistFormOnSubmit;
};
