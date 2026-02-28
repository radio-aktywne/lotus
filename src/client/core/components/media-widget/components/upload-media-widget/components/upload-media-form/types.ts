import type {
  UseFormInitialValues,
  UseFormOnError,
  UseFormOnSubmit,
  UseFormSubmitInput,
  UseFormValues,
} from "../../../../../../../../isomorphic/core/hooks/use-form";
import type { Schemas } from "./schemas";

export type UploadMediaFormSchema = typeof Schemas.Values;

export type UploadMediaFormValues = UseFormValues<UploadMediaFormSchema>;

export type UploadMediaFormInitialValues =
  UseFormInitialValues<UploadMediaFormSchema>;

export type UploadMediaFormOnError = UseFormOnError;

export type UploadMediaFormSubmitInput =
  UseFormSubmitInput<UploadMediaFormSchema>;

export type UploadMediaFormOnSubmit = UseFormOnSubmit<UploadMediaFormSchema>;

export type UploadMediaFormInput = {
  initialValues: UploadMediaFormValues;
  onError?: UploadMediaFormOnError;
  onSubmit: UploadMediaFormOnSubmit;
};
