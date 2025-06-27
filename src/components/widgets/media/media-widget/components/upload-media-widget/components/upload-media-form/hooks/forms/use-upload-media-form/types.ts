import { UseFormReturnType } from "@mantine/form";

export type UseUploadMediaFormValues = {
  file: File | null | undefined;
  name: string | undefined;
};

export type UseUploadMediaFormInitialValues = Partial<UseUploadMediaFormValues>;

export type UseUploadMediaFormValidators = {
  [K in keyof UseUploadMediaFormValues]?: (
    value: UseUploadMediaFormValues[K],
  ) => null | string | undefined;
};

export type UseUploadMediaFormDefaultValues = Partial<UseUploadMediaFormValues>;

export type UseUploadMediaFormInput = {
  initialValues?: UseUploadMediaFormInitialValues;
  validate?: UseUploadMediaFormValidators;
};

export type UseUploadMediaFormOutput = {
  defaultValues: UseUploadMediaFormDefaultValues;
  form: UseFormReturnType<UseUploadMediaFormValues>;
};
