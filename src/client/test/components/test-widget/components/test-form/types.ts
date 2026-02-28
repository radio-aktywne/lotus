import type {
  UseFormInitialValues,
  UseFormOnError,
  UseFormOnSubmit,
  UseFormSubmitInput,
  UseFormValues,
} from "../../../../../../isomorphic/core/hooks/use-form";
import type { Schemas } from "./schemas";

export type TestFormSchema = typeof Schemas.Values;

export type TestFormValues = UseFormValues<TestFormSchema>;

export type TestFormInitialValues = UseFormInitialValues<TestFormSchema>;

export type TestFormOnError = UseFormOnError;

export type TestFormSubmitInput = UseFormSubmitInput<TestFormSchema>;

export type TestFormOnSubmit = UseFormOnSubmit<TestFormSchema>;

export type TestFormInput = {
  initialValues: TestFormValues;
  onError?: TestFormOnError;
  onSubmit: TestFormOnSubmit;
};
