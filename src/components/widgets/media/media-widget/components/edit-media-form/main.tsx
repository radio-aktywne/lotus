"use client";

import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Button, Loader, Stack, TextInput } from "@mantine/core";
import { useCallback, useState } from "react";

import {
  useMediaForm,
  UseMediaFormValues,
} from "../../../../../../hooks/forms/use-media-form";
import { EditMediaFormInput } from "./types";

export function EditMediaForm({
  initialData,
  onDelete,
  onSave,
  validate,
}: EditMediaFormInput) {
  const [saving, setSaving] = useState(false);

  const { _ } = useLingui();

  const { form, loading } = useMediaForm({
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

  if (loading) return <Loader />;

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
        <Button color="red" onClick={onDelete}>
          {_(msg({ message: "Delete" }))}
        </Button>
      </Stack>
    </form>
  );
}
