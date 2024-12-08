import {
  UseBindingFormInitialValues,
  UseBindingFormValidators,
  UseBindingFormValues,
} from "../../../../../../hooks/forms/use-binding-form";

export type EditBindingFormInitialData = UseBindingFormInitialValues;

export type EditBindingFormData = UseBindingFormValues;

export type EditBindingFormErrors = {
  [K in keyof UseBindingFormValues]?: string;
};

export type EditBindingFormValidators = UseBindingFormValidators;

export type EditBindingFormInput = {
  initialData: EditBindingFormInitialData;
  onDelete?: () => void;
  onSave?: (
    data: EditBindingFormData,
  ) => Promise<EditBindingFormErrors | null | undefined>;
  validate?: EditBindingFormValidators;
};
