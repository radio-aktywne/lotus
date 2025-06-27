import { useForm } from "@mantine/form";
import "client-only";

import { defaultValues } from "./constants";
import {
  UsePlaylistAddFormInput,
  UsePlaylistAddFormOutput,
  UsePlaylistAddFormValues,
} from "./types";

export function usePlaylistAddForm({
  initialValues,
  validate,
}: UsePlaylistAddFormInput): UsePlaylistAddFormOutput {
  const form = useForm<UsePlaylistAddFormValues>({
    initialValues: {
      media: initialValues?.media ?? defaultValues.media,
      rank: initialValues?.rank ?? defaultValues.rank,
    },
    validate: validate,
  });

  return { defaultValues, form };
}
