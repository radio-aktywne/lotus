import {
  UseBindingFormValidators,
  UseBindingFormValues,
} from "../../../../../../hooks/forms/use-binding-form";

export type CreateBindingFormData = UseBindingFormValues;

export type CreateBindingFormErrors = {
  [K in keyof UseBindingFormValues]?: string;
};

export type CreateBindingFormValidators = UseBindingFormValidators;

export type CreateBindingFormInput = {
  onCreate?: (
    data: CreateBindingFormData,
  ) => Promise<CreateBindingFormErrors | null | undefined>;
  validate?: CreateBindingFormValidators;
};
