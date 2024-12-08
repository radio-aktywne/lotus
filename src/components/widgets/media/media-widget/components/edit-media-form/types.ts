import {
  UseMediaFormInitialValues,
  UseMediaFormValidators,
  UseMediaFormValues,
} from "../../../../../../hooks/forms/use-media-form";

export type EditMediaFormInitialData = UseMediaFormInitialValues;

export type EditMediaFormData = UseMediaFormValues;

export type EditMediaFormErrors = {
  [K in keyof UseMediaFormValues]?: string;
};

export type EditMediaFormValidators = UseMediaFormValidators;

export type EditMediaFormInput = {
  initialData: EditMediaFormInitialData;
  onDelete?: () => void;
  onSave?: (
    data: EditMediaFormData,
  ) => Promise<EditMediaFormErrors | null | undefined>;
  validate?: EditMediaFormValidators;
};
