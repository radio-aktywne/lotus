import { useForm } from "@mantine/form";
import "client-only";

import { defaultValues } from "./constants";
import {
  UseBindingFormInput,
  UseBindingFormOutput,
  UseBindingFormValues,
} from "./types";

export function useBindingForm({
  initialValues,
  validate,
}: UseBindingFormInput): UseBindingFormOutput {
  const form = useForm<UseBindingFormValues>({
    initialValues: {
      media: initialValues?.media ?? defaultValues.media,
      playlist: initialValues?.playlist ?? defaultValues.playlist,
      rank: initialValues?.rank ?? defaultValues.rank,
    },
    validate: validate,
  });

  return { defaultValues, form };
}
