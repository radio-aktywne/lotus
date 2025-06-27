"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Button, FileInput, Stack, TextInput } from "@mantine/core";
import { useCallback, useState } from "react";

import {
  useUploadMediaForm,
  UseUploadMediaFormValues,
} from "./hooks/forms/use-upload-media-form";
import { UploadMediaFormInput } from "./types";

export function UploadMediaForm({ onUpload, validate }: UploadMediaFormInput) {
  const [creating, setCreating] = useState(false);

  const { _ } = useLingui();

  const { form } = useUploadMediaForm({ validate: validate });

  const formSetErrors = form.setErrors;

  const handleUpload = useCallback(
    async (data: UseUploadMediaFormValues) => {
      setCreating(true);
      try {
        const errors = await onUpload?.(data);
        if (errors) formSetErrors(errors);
      } finally {
        setCreating(false);
      }
    },
    [formSetErrors, onUpload],
  );

  return (
    <form onSubmit={form.onSubmit(handleUpload)}>
      <Stack>
        <TextInput
          label={_(msg({ message: "Name" }))}
          required={true}
          {...form.getInputProps("name")}
        />
        <FileInput
          label={_(msg({ message: "File" }))}
          required={true}
          {...form.getInputProps("file")}
        />
        <Button loading={creating} type="submit">
          {_(msg({ message: "Upload" }))}
        </Button>
      </Stack>
    </form>
  );
}
