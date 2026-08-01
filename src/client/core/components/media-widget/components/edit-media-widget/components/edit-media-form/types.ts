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
} from "../../../../../../../../isomorphic/core/hooks/use-form";
import type { Schemas } from "./schemas";

export type EditMediaFormInputSchema = typeof Schemas.Input;

export type EditMediaFormOutputSchema = typeof Schemas.Output;

export type EditMediaFormInitialValues = UseFormInitialValues<
  z.output<EditMediaFormInputSchema>
>;

export type EditMediaFormErrorInput = UseFormErrorInput<
  z.output<EditMediaFormInputSchema>
>;

export type EditMediaFormOnError = UseFormOnError<
  z.output<EditMediaFormInputSchema>
>;

export type EditMediaFormSubmitInput = UseFormSubmitInput<
  z.output<EditMediaFormOutputSchema>
>;

export type EditMediaFormErrors = UseFormErrors<
  z.input<EditMediaFormInputSchema>
>;

export type EditMediaFormSubmitErrorOutput = UseFormSubmitErrorOutput<
  z.input<EditMediaFormInputSchema>
>;

export type EditMediaFormSubmitSuccessOutput = UseFormSubmitSuccessOutput<
  z.output<EditMediaFormInputSchema>
>;

export type EditMediaFormSubmitOutput = UseFormSubmitOutput<
  z.input<EditMediaFormInputSchema>,
  z.output<EditMediaFormInputSchema>
>;

export type EditMediaFormOnSubmit = UseFormOnSubmit<
  z.input<EditMediaFormInputSchema>,
  z.output<EditMediaFormInputSchema>,
  z.output<EditMediaFormOutputSchema>
>;

export type EditMediaFormInput = (HasRequiredKeys<
  z.output<EditMediaFormInputSchema>
> extends true
  ? { initialValues: EditMediaFormInitialValues }
  : { initialValues?: EditMediaFormInitialValues }) & {
  onError?: EditMediaFormOnError;
  onSubmit: EditMediaFormOnSubmit;
};
