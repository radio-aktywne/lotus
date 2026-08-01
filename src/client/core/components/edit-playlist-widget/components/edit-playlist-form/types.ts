import type { HasRequiredKeys } from "type-fest";
import type * as z from "zod";

import type {
  UseFormErrorInput,
  UseFormErrors,
  UseFormInitialValues,
  UseFormOnError,
  UseFormOnSubmit,
  UseFormSubmitErrorOutput,
  UseFormSubmitInput,
  UseFormSubmitOutput,
  UseFormSubmitSuccessOutput,
} from "../../../../../../isomorphic/core/hooks/use-form";
import type { Schemas } from "./schemas";

export type EditPlaylistFormInputSchema = typeof Schemas.Input;

export type EditPlaylistFormOutputSchema = typeof Schemas.Output;

export type EditPlaylistFormInitialValues = UseFormInitialValues<
  z.output<EditPlaylistFormInputSchema>
>;

export type EditPlaylistFormErrorInput = UseFormErrorInput<
  z.output<EditPlaylistFormInputSchema>
>;

export type EditPlaylistFormOnError = UseFormOnError<
  z.output<EditPlaylistFormInputSchema>
>;

export type EditPlaylistFormSubmitInput = UseFormSubmitInput<
  z.output<EditPlaylistFormOutputSchema>
>;

export type EditPlaylistFormErrors = UseFormErrors<
  z.input<EditPlaylistFormInputSchema>
>;

export type EditPlaylistFormSubmitErrorOutput = UseFormSubmitErrorOutput<
  z.input<EditPlaylistFormInputSchema>
>;

export type EditPlaylistFormSubmitSuccessOutput = UseFormSubmitSuccessOutput<
  z.output<EditPlaylistFormInputSchema>
>;

export type EditPlaylistFormSubmitOutput = UseFormSubmitOutput<
  z.input<EditPlaylistFormInputSchema>,
  z.output<EditPlaylistFormInputSchema>
>;

export type EditPlaylistFormOnSubmit = UseFormOnSubmit<
  z.input<EditPlaylistFormInputSchema>,
  z.output<EditPlaylistFormInputSchema>,
  z.output<EditPlaylistFormOutputSchema>
>;

export type EditPlaylistFormInput = (HasRequiredKeys<
  z.output<EditPlaylistFormInputSchema>
> extends true
  ? { initialValues: EditPlaylistFormInitialValues }
  : { initialValues?: EditPlaylistFormInitialValues }) & {
  onError?: EditPlaylistFormOnError;
  onSubmit: EditPlaylistFormOnSubmit;
};
