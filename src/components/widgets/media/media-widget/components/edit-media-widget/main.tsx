"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Button, Stack } from "@mantine/core";
import { useCallback } from "react";

import { updateMedia } from "../../../../../../actions/pelican/media/update-media";
import { useToasts } from "../../../../../../hooks/use-toasts";
import { EditMediaForm, EditMediaFormData } from "./components/edit-media-form";
import { EditMediaWidgetInput } from "./types";

export function EditMediaWidget({
  media,
  onCancel,
  onSave,
}: EditMediaWidgetInput) {
  const { _ } = useLingui();
  const toasts = useToasts();

  const initialData = { name: media.name };

  const handleSaveAfterValidation = useCallback(
    async (name: string) => {
      const { error: updateError } = await updateMedia({
        data: { name: name },
        id: media.id,
      });

      if (updateError) {
        const translated = _(updateError);
        toasts.error(translated);
        return { name: translated };
      }

      toasts.success(_(msg({ message: "Media updated successfully" })));
      onSave?.();
    },
    [_, media, onSave, toasts],
  );

  const handleSave = useCallback(
    async (data: EditMediaFormData) => {
      if (!data.name) return { name: _(msg({ message: "Name is required" })) };

      return handleSaveAfterValidation(data.name);
    },
    [_, handleSaveAfterValidation],
  );

  return (
    <Stack>
      <EditMediaForm initialData={initialData} onSave={handleSave} />
      <Button color="ra-red" onClick={onCancel}>
        {_(msg({ message: "Cancel" }))}
      </Button>
    </Stack>
  );
}
