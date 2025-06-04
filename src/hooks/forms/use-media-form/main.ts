import { useForm } from "@mantine/form";
import "client-only";

import { defaultValues } from "./constants";
import {
  UseMediaFormInput,
  UseMediaFormOutput,
  UseMediaFormValues,
} from "./types";

export function useMediaForm({
  initialValues,
  validate,
}: UseMediaFormInput): UseMediaFormOutput {
  const form = useForm<UseMediaFormValues>({
    initialValues: {
      name: initialValues?.name ?? defaultValues.name,
    },
    validate: validate,
  });

  return { defaultValues, form };
}
