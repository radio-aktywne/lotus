import { useForm } from "@mantine/form";
import "client-only";
import { useMemo } from "react";

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
      name:
        initialValues?.name === undefined
          ? defaultValues.name
          : initialValues.name,
    },
    validate: validate,
  });

  const allowedValues = useMemo(() => ({}), []);

  return {
    allowedValues,
    defaultValues,
    form,
    loading: false,
  };
}
