"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Button, Loader, Stack, TextInput } from "@mantine/core";
import { useCallback, useState } from "react";

import {
  usePlaylistForm,
  UsePlaylistFormValues,
} from "../../../../../../hooks/forms/use-playlist-form";
import { CreatePlaylistFormInput } from "./types";

export function CreatePlaylistForm({
  onCreate,
  validate,
}: CreatePlaylistFormInput) {
  const [creating, setCreating] = useState(false);

  const { _ } = useLingui();

  const { form, loading } = usePlaylistForm({
    validate: validate,
  });

  const formSetErrors = form.setErrors;

  const handleCreate = useCallback(
    async (data: UsePlaylistFormValues) => {
      setCreating(true);
      try {
        const errors = await onCreate?.(data);
        if (errors) formSetErrors(errors);
      } finally {
        setCreating(false);
      }
    },
    [formSetErrors, onCreate],
  );

  if (loading) return <Loader />;

  return (
    <form onSubmit={form.onSubmit(handleCreate)}>
      <Stack>
        <TextInput
          label={_(msg({ message: "Name" }))}
          required={true}
          {...form.getInputProps("name")}
        />
        <Button loading={creating} type="submit">
          {_(msg({ message: "Create" }))}
        </Button>
      </Stack>
    </form>
  );
}
