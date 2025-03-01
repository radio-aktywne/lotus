"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Button, Loader, Stack, TextInput } from "@mantine/core";
import { useCallback, useState } from "react";

import {
  useMediaForm,
  UseMediaFormValues,
} from "../../../../../../hooks/forms/use-media-form";
import { CreateMediaFormInput } from "./types";

export function CreateMediaForm({ onCreate, validate }: CreateMediaFormInput) {
  const [creating, setCreating] = useState(false);

  const { _ } = useLingui();

  const { form, loading } = useMediaForm({
    validate: validate,
  });

  const formSetErrors = form.setErrors;

  const handleCreate = useCallback(
    async (data: UseMediaFormValues) => {
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
