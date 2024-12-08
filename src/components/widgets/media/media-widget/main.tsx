"use client";

import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Stack } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

import { deleteMedia } from "../../../../actions/pelican/media/delete-media";
import { updateMedia } from "../../../../actions/pelican/media/update-media";
import { useGetMedia } from "../../../../hooks/pelican/media/use-get-media";
import { useToasts } from "../../../../hooks/use-toasts";
import { DownloadButton } from "./components/download-button";
import { EditMediaForm, EditMediaFormData } from "./components/edit-media-form";
import { UploadButton } from "./components/upload-button";
import { MediaWidgetInput } from "./types";

export function MediaWidget({ media: prefetchedMedia }: MediaWidgetInput) {
  const router = useRouter();

  const { _ } = useLingui();
  const toasts = useToasts();

  const { data: currentMedia, error } = useGetMedia({
    id: prefetchedMedia.id,
  });
  const media = currentMedia ?? prefetchedMedia;

  const initialData = { name: media.name };

  useEffect(() => {
    if (error) toasts.warning(_(error));
  }, [_, error, toasts]);

  const handleSaveAfterValidation = useCallback(
    async (name: string) => {
      const { error: updateError } = await updateMedia({
        data: { name: name },
        id: media.id,
      });

      if (updateError) {
        const translated = _(updateError);
        toasts.error(translated);
        router.refresh();
        return { name: translated };
      }

      toasts.success(_(msg({ message: "Media updated successfully" })));
      router.refresh();
    },
    [_, media, router, toasts],
  );

  const handleSave = useCallback(
    async (data: EditMediaFormData) => {
      if (!data.name) return { name: _(msg({ message: "Name is required" })) };

      return handleSaveAfterValidation(data.name);
    },
    [_, handleSaveAfterValidation],
  );

  const handleDelete = useCallback(async () => {
    const { error: deleteError } = await deleteMedia({ id: media.id });

    if (deleteError) {
      toasts.error(_(deleteError));
      router.refresh();
    } else {
      toasts.success(_(msg({ message: "Media deleted successfully" })));
      router.push("/media");
    }
  }, [_, media, router, toasts]);

  const handleUpload = useCallback(
    async (file: File | null) => {
      if (!file) {
        toasts.error(_(msg({ message: "File is required" })));
        return;
      }

      const response = await fetch(`/api/media/${media.id}`, {
        body: file,
        method: "PUT",
      });

      if (response.ok)
        toasts.success(
          _(msg({ message: "Media content uploaded successfully" })),
        );
      else toasts.error(_(msg({ message: "Failed to upload media content" })));
    },
    [_, media, toasts],
  );

  return (
    <Stack>
      <EditMediaForm
        initialData={initialData}
        onDelete={handleDelete}
        onSave={handleSave}
      />
      <UploadButton
        label={_(msg({ message: "Upload" }))}
        media={media}
        onUpload={handleUpload}
      />
      <DownloadButton label={_(msg({ message: "Download" }))} media={media} />
    </Stack>
  );
}
