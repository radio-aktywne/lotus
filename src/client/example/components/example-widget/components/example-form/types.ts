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

export type ExampleFormInputSchema = typeof Schemas.Input;

export type ExampleFormOutputSchema = typeof Schemas.Output;

export type ExampleFormInitialValues = UseFormInitialValues<
  z.output<ExampleFormInputSchema>
>;

export type ExampleFormErrorInput = UseFormErrorInput<
  z.output<ExampleFormInputSchema>
>;

export type ExampleFormOnError = UseFormOnError<
  z.output<ExampleFormInputSchema>
>;

export type ExampleFormSubmitInput = UseFormSubmitInput<
  z.output<ExampleFormOutputSchema>
>;

export type ExampleFormErrors = UseFormErrors<z.input<ExampleFormInputSchema>>;

export type ExampleFormSubmitErrorOutput = UseFormSubmitErrorOutput<
  z.input<ExampleFormInputSchema>
>;

export type ExampleFormSubmitSuccessOutput = UseFormSubmitSuccessOutput<
  z.output<ExampleFormInputSchema>
>;

export type ExampleFormSubmitOutput = UseFormSubmitOutput<
  z.input<ExampleFormInputSchema>,
  z.output<ExampleFormInputSchema>
>;

export type ExampleFormOnSubmit = UseFormOnSubmit<
  z.input<ExampleFormInputSchema>,
  z.output<ExampleFormInputSchema>,
  z.output<ExampleFormOutputSchema>
>;

export type ExampleFormInput = (HasRequiredKeys<
  z.output<ExampleFormInputSchema>
> extends true
  ? { initialValues: ExampleFormInitialValues }
  : { initialValues?: ExampleFormInitialValues }) & {
  onError?: ExampleFormOnError;
  onSubmit: ExampleFormOnSubmit;
};
