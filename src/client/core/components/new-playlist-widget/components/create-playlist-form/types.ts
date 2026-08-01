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

export type CreatePlaylistFormInputSchema = typeof Schemas.Input;

export type CreatePlaylistFormOutputSchema = typeof Schemas.Output;

export type CreatePlaylistFormInitialValues = UseFormInitialValues<
  z.output<CreatePlaylistFormInputSchema>
>;

export type CreatePlaylistFormErrorInput = UseFormErrorInput<
  z.output<CreatePlaylistFormInputSchema>
>;

export type CreatePlaylistFormOnError = UseFormOnError<
  z.output<CreatePlaylistFormInputSchema>
>;

export type CreatePlaylistFormSubmitInput = UseFormSubmitInput<
  z.output<CreatePlaylistFormOutputSchema>
>;

export type CreatePlaylistFormErrors = UseFormErrors<
  z.input<CreatePlaylistFormInputSchema>
>;

export type CreatePlaylistFormSubmitErrorOutput = UseFormSubmitErrorOutput<
  z.input<CreatePlaylistFormInputSchema>
>;

export type CreatePlaylistFormSubmitSuccessOutput = UseFormSubmitSuccessOutput<
  z.output<CreatePlaylistFormInputSchema>
>;

export type CreatePlaylistFormSubmitOutput = UseFormSubmitOutput<
  z.input<CreatePlaylistFormInputSchema>,
  z.output<CreatePlaylistFormInputSchema>
>;

export type CreatePlaylistFormOnSubmit = UseFormOnSubmit<
  z.input<CreatePlaylistFormInputSchema>,
  z.output<CreatePlaylistFormInputSchema>,
  z.output<CreatePlaylistFormOutputSchema>
>;

export type CreatePlaylistFormInput = (HasRequiredKeys<
  z.output<CreatePlaylistFormInputSchema>
> extends true
  ? { initialValues: CreatePlaylistFormInitialValues }
  : { initialValues?: CreatePlaylistFormInitialValues }) & {
  onError?: CreatePlaylistFormOnError;
  onSubmit: CreatePlaylistFormOnSubmit;
};
