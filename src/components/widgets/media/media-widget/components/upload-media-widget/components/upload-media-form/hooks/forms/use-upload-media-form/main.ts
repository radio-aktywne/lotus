import { useForm } from "@mantine/form";
import "client-only";

import { defaultValues } from "./constants";
import {
  UseUploadMediaFormInput,
  UseUploadMediaFormOutput,
  UseUploadMediaFormValues,
} from "./types";

export function useUploadMediaForm({
  initialValues,
  validate,
}: UseUploadMediaFormInput): UseUploadMediaFormOutput {
  const form = useForm<UseUploadMediaFormValues>({
    initialValues: {
      file:
        initialValues?.file === undefined
          ? defaultValues.file
          : initialValues.file,
      name: initialValues?.name ?? defaultValues.name,
    },
    validate: validate,
  });

  return { defaultValues, form };
}
