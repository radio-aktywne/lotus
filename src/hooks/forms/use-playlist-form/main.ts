import { useForm } from "@mantine/form";
import "client-only";

import { defaultValues } from "./constants";
import {
  UsePlaylistFormInput,
  UsePlaylistFormOutput,
  UsePlaylistFormValues,
} from "./types";

export function usePlaylistForm({
  initialValues,
  validate,
}: UsePlaylistFormInput): UsePlaylistFormOutput {
  const form = useForm<UsePlaylistFormValues>({
    initialValues: {
      name: initialValues?.name ?? defaultValues.name,
    },
    validate: validate,
  });

  return { defaultValues, form };
}
