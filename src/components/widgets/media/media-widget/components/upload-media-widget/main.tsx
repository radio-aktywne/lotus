"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Button, Stack } from "@mantine/core";
import { useCallback } from "react";

import { createMedia } from "../../../../../../actions/pelican/media/create-media";
import { useToasts } from "../../../../../../hooks/use-toasts";
import {
  UploadMediaForm,
  UploadMediaFormData,
} from "./components/upload-media-form";
import { UploadMediaWidgetInput } from "./types";

export function UploadMediaWidget({
  onCancel,
  onUpload,
}: UploadMediaWidgetInput) {
  const { _ } = useLingui();
  const toasts = useToasts();

  const handleUploadAfterValidation = useCallback(
    async (name: string, file: File) => {
      const { data: media, error: createError } = await createMedia({
        name: name,
      });

      if (createError) {
        const translated = _(createError);
        toasts.error(translated);
        return { file: translated, name: translated };
      }

      const response = await fetch(`/api/media/${media.id}`, {
        body: file,
        method: "PUT",
      });

      if (!response.ok) {
        const data = (await response.json()) as { error: string };
        const translated = _(data.error);

        toasts.error(translated);
        return { file: translated, name: translated };
      }

      toasts.success(_(msg({ message: "Media uploaded successfully" })));
      onUpload?.();
    },
    [_, onUpload, toasts],
  );

  const handleUpload = useCallback(
    async (data: UploadMediaFormData) => {
      if (!data.name) return { name: _(msg({ message: "Name is required" })) };

      if (!data.file) return { file: _(msg({ message: "File is required" })) };

      return handleUploadAfterValidation(data.name, data.file);
    },
    [_, handleUploadAfterValidation],
  );

  return (
    <Stack>
      <UploadMediaForm onUpload={handleUpload} />
      <Button color="ra-red" onClick={onCancel}>
        {_(msg({ message: "Cancel" }))}
      </Button>
    </Stack>
  );
}
