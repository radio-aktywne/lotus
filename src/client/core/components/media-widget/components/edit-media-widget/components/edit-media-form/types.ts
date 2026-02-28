import type {
  UseFormInitialValues,
  UseFormOnError,
  UseFormOnSubmit,
  UseFormSubmitInput,
  UseFormValues,
} from "../../../../../../../../isomorphic/core/hooks/use-form";
import type { Schemas } from "./schemas";

export type EditMediaFormSchema = typeof Schemas.Values;

export type EditMediaFormValues = UseFormValues<EditMediaFormSchema>;

export type EditMediaFormInitialValues =
  UseFormInitialValues<EditMediaFormSchema>;

export type EditMediaFormOnError = UseFormOnError;

export type EditMediaFormSubmitInput = UseFormSubmitInput<EditMediaFormSchema>;

export type EditMediaFormOnSubmit = UseFormOnSubmit<EditMediaFormSchema>;

export type EditMediaFormInput = {
  initialValues: EditMediaFormValues;
  onError?: EditMediaFormOnError;
  onSubmit: EditMediaFormOnSubmit;
};
