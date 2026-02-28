import { useForm as useMantineForm } from "@mantine/form";
import { useCallback, useMemo, useState } from "react";

import type {
  UseFormInput,
  UseFormOutput,
  UseFormValues,
  ZodObject,
} from "./types";

import { useLocalization } from "../../../localization/hooks/use-localization";
import { handleSubmitResult, validateValuesLocalized } from "./utils";

export function useForm<SchemaType extends ZodObject>({
  initialValues,
  onError,
  onSubmit,
  schema,
}: UseFormInput<SchemaType>): UseFormOutput<SchemaType> {
  const [submitting, setSubmitting] = useState(false);

  const { localization } = useLocalization();

  const validate = useCallback(
    (values: { [key: string]: unknown }) =>
      validateValuesLocalized(schema, values, localization.data),
    [localization.data, schema],
  );

  const form = useMantineForm<UseFormValues<SchemaType>>({
    initialValues: initialValues,
    mode: "uncontrolled",
    validate: validate,
  });

  const handleSubmit = useCallback(
    async (values: UseFormValues<SchemaType>) => {
      if (submitting || !onSubmit) return;

      setSubmitting(true);

      try {
        const result = await onSubmit({ values: values });
        handleSubmitResult(
          result,
          form.reset,
          form.setErrors,
          form.setInitialValues,
          localization.localize,
        );
      } finally {
        setSubmitting(false);
      }
    },
    [
      form.reset,
      form.setErrors,
      form.setInitialValues,
      localization.localize,
      onSubmit,
      submitting,
    ],
  );

  const handleError = useCallback(() => {
    onError?.();
  }, [onError]);

  const handleFormSubmit = useMemo(
    () => form.onSubmit(handleSubmit, handleError),
    [form.onSubmit, handleError, handleSubmit],
  );

  return useMemo(
    () => ({
      form: form,
      handleFormSubmit: handleFormSubmit,
      submitting: submitting,
    }),
    [form, handleFormSubmit, submitting],
  );
}
