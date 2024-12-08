import { UseFormReturnType } from "@mantine/form";

export type UseBindingFormValues = {
  media: string | undefined;
  playlist: string | undefined;
  rank: string | undefined;
};

export type UseBindingFormInitialValues = Partial<UseBindingFormValues>;

export type UseBindingFormValidators = {
  [K in keyof UseBindingFormValues]?: (
    value: UseBindingFormValues[K],
  ) => null | string | undefined;
};

export type UseBindingFormAllowedValues = {
  media: string[];
  playlist: string[];
};

export type UseBindingFormDefaultValues = Partial<UseBindingFormValues>;

export type UseBindingFormInput = {
  initialValues?: UseBindingFormInitialValues;
  validate?: UseBindingFormValidators;
};

export type UseBindingFormOutput = {
  allowedValues: UseBindingFormAllowedValues;
  defaultValues: UseBindingFormDefaultValues;
  form: UseFormReturnType<UseBindingFormValues>;
  loading: boolean;
};
