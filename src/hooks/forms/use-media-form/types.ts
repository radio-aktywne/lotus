import { UseFormReturnType } from "@mantine/form";

export type UseMediaFormValues = {
  name: string | undefined;
};

export type UseMediaFormInitialValues = Partial<UseMediaFormValues>;

export type UseMediaFormValidators = {
  [K in keyof UseMediaFormValues]?: (
    value: UseMediaFormValues[K],
  ) => null | string | undefined;
};

export type UseMediaFormAllowedValues = {
  [key: string]: never;
};

export type UseMediaFormDefaultValues = Partial<UseMediaFormValues>;

export type UseMediaFormInput = {
  initialValues?: UseMediaFormInitialValues;
  validate?: UseMediaFormValidators;
};

export type UseMediaFormOutput = {
  allowedValues: UseMediaFormAllowedValues;
  defaultValues: UseMediaFormDefaultValues;
  form: UseFormReturnType<UseMediaFormValues>;
  loading: boolean;
};
