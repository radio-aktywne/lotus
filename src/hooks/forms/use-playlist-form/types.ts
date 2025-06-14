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

export type UsePlaylistFormDefaultValues = Partial<UsePlaylistFormValues>;

export type UsePlaylistFormInput = {
  initialValues?: UsePlaylistFormInitialValues;
  validate?: UsePlaylistFormValidators;
};

export type UsePlaylistFormOutput = {
  defaultValues: UsePlaylistFormDefaultValues;
  form: UseFormReturnType<UsePlaylistFormValues>;
};
