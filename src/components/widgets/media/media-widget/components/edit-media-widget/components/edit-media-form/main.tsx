"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Button, Stack, TextInput } from "@mantine/core";
import { useCallback, useState } from "react";

import {
  useMediaForm,
  UseMediaFormValues,
} from "../../../../../../../../hooks/forms/use-media-form";
import { EditMediaFormInput } from "./types";

export function EditMediaForm({
  initialData,
  onSave,
  validate,
}: EditMediaFormInput) {
  const [saving, setSaving] = useState(false);

  const { _ } = useLingui();

  const { form } = useMediaForm({
    initialValues: initialData,
    validate: validate,
  });

  const formSetErrors = form.setErrors;

  const handleSave = useCallback(
    async (data: UseMediaFormValues) => {
      setSaving(true);
      try {
        const errors = await onSave?.(data);
        if (errors) formSetErrors(errors);
      } finally {
        setSaving(false);
      }
    },
    [formSetErrors, onSave],
  );

  return (
    <form onSubmit={form.onSubmit(handleSave)}>
      <Stack>
        <TextInput
          label={_(msg({ message: "Name" }))}
          required={true}
          {...form.getInputProps("name")}
        />
        <Button loading={saving} type="submit">
          {_(msg({ message: "Save" }))}
        </Button>
      </Stack>
    </form>
  );
}
