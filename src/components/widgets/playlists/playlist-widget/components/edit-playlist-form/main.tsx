"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Button, Stack, TextInput } from "@mantine/core";
import { useCallback, useState } from "react";

import {
  usePlaylistForm,
  UsePlaylistFormValues,
} from "../../../../../../hooks/forms/use-playlist-form";
import { EditPlaylistFormInput } from "./types";

export function EditPlaylistForm({
  initialData,
  onDelete,
  onSave,
  validate,
}: EditPlaylistFormInput) {
  const [saving, setSaving] = useState(false);

  const { _ } = useLingui();

  const { form } = usePlaylistForm({
    initialValues: initialData,
    validate: validate,
  });

  const formSetErrors = form.setErrors;

  const handleSave = useCallback(
    async (data: UsePlaylistFormValues) => {
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
        <Button color="red" onClick={onDelete}>
          {_(msg({ message: "Delete" }))}
        </Button>
      </Stack>
    </form>
  );
}
