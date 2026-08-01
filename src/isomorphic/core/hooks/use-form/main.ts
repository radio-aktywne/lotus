import type { MessageDescriptor } from "@lingui/core";

import { useForm as useMantineForm } from "@mantine/form";
import { mapValues } from "es-toolkit/object";
import { useCallback, useMemo, useState } from "react";
import * as z from "zod";

import type { UseFormInput, UseFormOutput, Values } from "./types";

import { useLocalization } from "../../../localization/hooks/use-localization";

export function useForm<
  RawValuesType extends Values,
  InputValuesType extends Values,
  OutputValuesType extends Values,
>({
  initialValues,
  inputSchema,
  onError,
  onSubmit,
  onValuesChange,
  outputSchema,
}: UseFormInput<
  RawValuesType,
  InputValuesType,
  OutputValuesType
>): UseFormOutput<RawValuesType> {
  const [submitting, setSubmitting] = useState(false);

  const { localization } = useLocalization();

  const rawInitialValues = useMemo(
    () => z.encode(inputSchema, initialValues ?? ({} as InputValuesType)),
    [initialValues, inputSchema],
  );

  const onRawValuesChange = useCallback(
    (current: RawValuesType, previous: RawValuesType) =>
      onValuesChange?.({
        current: z.decode(inputSchema, current),
        previous: z.decode(inputSchema, previous),
      }),
    [inputSchema, onValuesChange],
  );

  const validateRawValues = useCallback(
    (values: RawValuesType) => {
      const { error } = z.safeDecode(outputSchema, values, {
        error: localization.data.zod.localeError,
      });

      const issues = error?.issues ?? [];

      return Object.fromEntries(
        issues.map((issue) => [issue.path.join("."), issue.message]),
      );
    },
    [localization.data, outputSchema],
  );

  const form = useMantineForm<RawValuesType>({
    initialValues: rawInitialValues,
    mode: "uncontrolled",
    onValuesChange: onRawValuesChange,
    validate: validateRawValues,
  });

  const handleSubmit = useCallback(
    async (values: RawValuesType) => {
      if (submitting || !onSubmit) return;

      setSubmitting(true);

      try {
        const result = await onSubmit({
          values: z.decode(outputSchema, values),
        });

        if (result === undefined) {
          form.reset();
        } else if (result.errors !== undefined) {
          form.setErrors(
            mapValues(result.errors, (error?: MessageDescriptor | string) =>
              error === undefined || typeof error === "string"
                ? error
                : localization.localize(error),
            ),
          );
        } else if (result.values !== undefined) {
          form.setInitialValues(z.encode(inputSchema, result.values));
          form.reset();
        } else {
          form.reset();
        }
      } finally {
        setSubmitting(false);
      }
    },
    [
      form.reset,
      form.setErrors,
      form.setInitialValues,
      inputSchema,
      localization.localize,
      onSubmit,
      outputSchema,
      submitting,
    ],
  );

  const handleError = useCallback(
    (_: unknown, values: RawValuesType) => {
      onError?.({ values: z.decode(inputSchema, values) });
    },
    [onError, inputSchema],
  );

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
