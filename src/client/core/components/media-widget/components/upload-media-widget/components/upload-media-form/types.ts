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

export type UploadMediaFormInputSchema = typeof Schemas.Input;

export type UploadMediaFormOutputSchema = typeof Schemas.Output;

export type UploadMediaFormInitialValues = UseFormInitialValues<
  z.output<UploadMediaFormInputSchema>
>;

export type UploadMediaFormErrorInput = UseFormErrorInput<
  z.output<UploadMediaFormInputSchema>
>;

export type UploadMediaFormOnError = UseFormOnError<
  z.output<UploadMediaFormInputSchema>
>;

export type UploadMediaFormSubmitInput = UseFormSubmitInput<
  z.output<UploadMediaFormOutputSchema>
>;

export type UploadMediaFormErrors = UseFormErrors<
  z.input<UploadMediaFormInputSchema>
>;

export type UploadMediaFormSubmitErrorOutput = UseFormSubmitErrorOutput<
  z.input<UploadMediaFormInputSchema>
>;

export type UploadMediaFormSubmitSuccessOutput = UseFormSubmitSuccessOutput<
  z.output<UploadMediaFormInputSchema>
>;

export type UploadMediaFormSubmitOutput = UseFormSubmitOutput<
  z.input<UploadMediaFormInputSchema>,
  z.output<UploadMediaFormInputSchema>
>;

export type UploadMediaFormOnSubmit = UseFormOnSubmit<
  z.input<UploadMediaFormInputSchema>,
  z.output<UploadMediaFormInputSchema>,
  z.output<UploadMediaFormOutputSchema>
>;

export type UploadMediaFormInput = (HasRequiredKeys<
  z.output<UploadMediaFormInputSchema>
> extends true
  ? { initialValues: UploadMediaFormInitialValues }
  : { initialValues?: UploadMediaFormInitialValues }) & {
  onError?: UploadMediaFormOnError;
  onSubmit: UploadMediaFormOnSubmit;
};
