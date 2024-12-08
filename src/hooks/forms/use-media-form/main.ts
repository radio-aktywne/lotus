import { useForm } from "@mantine/form";
import "client-only";
import { useMemo } from "react";

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
