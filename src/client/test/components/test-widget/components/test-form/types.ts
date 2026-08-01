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

export type TestFormInputSchema = typeof Schemas.Input;

export type TestFormOutputSchema = typeof Schemas.Output;

export type TestFormInitialValues = UseFormInitialValues<
  z.output<TestFormInputSchema>
>;

export type TestFormErrorInput = UseFormErrorInput<
  z.output<TestFormInputSchema>
>;

export type TestFormOnError = UseFormOnError<z.output<TestFormInputSchema>>;

export type TestFormSubmitInput = UseFormSubmitInput<
  z.output<TestFormOutputSchema>
>;

export type TestFormErrors = UseFormErrors<z.input<TestFormInputSchema>>;

export type TestFormSubmitErrorOutput = UseFormSubmitErrorOutput<
  z.input<TestFormInputSchema>
>;

export type TestFormSubmitSuccessOutput = UseFormSubmitSuccessOutput<
  z.output<TestFormInputSchema>
>;

export type TestFormSubmitOutput = UseFormSubmitOutput<
  z.input<TestFormInputSchema>,
  z.output<TestFormInputSchema>
>;

export type TestFormOnSubmit = UseFormOnSubmit<
  z.input<TestFormInputSchema>,
  z.output<TestFormInputSchema>,
  z.output<TestFormOutputSchema>
>;

export type TestFormInput = (HasRequiredKeys<
  z.output<TestFormInputSchema>
> extends true
  ? { initialValues: TestFormInitialValues }
  : { initialValues?: TestFormInitialValues }) & {
  onError?: TestFormOnError;
  onSubmit: TestFormOnSubmit;
};
