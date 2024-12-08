import { UseFormReturnType } from "@mantine/form";

export type UsePlaylistFormValues = {
  name: string | undefined;
};

export type UsePlaylistFormInitialValues = Partial<UsePlaylistFormValues>;

export type UsePlaylistFormValidators = {
  [K in keyof UsePlaylistFormValues]?: (
    value: UsePlaylistFormValues[K],
  ) => null | string | undefined;
};

export type UsePlaylistFormAllowedValues = {
  [key: string]: never;
};

export type UsePlaylistFormDefaultValues = Partial<UsePlaylistFormValues>;

export type UsePlaylistFormInput = {
  initialValues?: UsePlaylistFormInitialValues;
  validate?: UsePlaylistFormValidators;
};

export type UsePlaylistFormOutput = {
  allowedValues: UsePlaylistFormAllowedValues;
  defaultValues: UsePlaylistFormDefaultValues;
  form: UseFormReturnType<UsePlaylistFormValues>;
  loading: boolean;
};
