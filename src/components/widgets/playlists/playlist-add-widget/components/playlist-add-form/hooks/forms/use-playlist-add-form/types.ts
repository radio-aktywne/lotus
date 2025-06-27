import { UseFormReturnType } from "@mantine/form";

export type UsePlaylistAddFormValues = {
  media: string | undefined;
  rank: string | undefined;
};

export type UsePlaylistAddFormInitialValues = Partial<UsePlaylistAddFormValues>;

export type UsePlaylistAddFormValidators = {
  [K in keyof UsePlaylistAddFormValues]?: (
    value: UsePlaylistAddFormValues[K],
  ) => null | string | undefined;
};

export type UsePlaylistAddFormDefaultValues = Partial<UsePlaylistAddFormValues>;

export type UsePlaylistAddFormInput = {
  initialValues?: UsePlaylistAddFormInitialValues;
  validate?: UsePlaylistAddFormValidators;
};

export type UsePlaylistAddFormOutput = {
  defaultValues: UsePlaylistAddFormDefaultValues;
  form: UseFormReturnType<UsePlaylistAddFormValues>;
};
