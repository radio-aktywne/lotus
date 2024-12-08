"use client";

import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

import { deleteBinding } from "../../../../actions/pelican/bindings/delete-binding";
import { updateBinding } from "../../../../actions/pelican/bindings/update-binding";
import { useGetBinding } from "../../../../hooks/pelican/bindings/use-get-binding";
import { useToasts } from "../../../../hooks/use-toasts";
import {
  EditBindingForm,
  EditBindingFormData,
} from "./components/edit-binding-form";
import { BindingWidgetInput } from "./types";

export function BindingWidget({
  binding: prefetchedBinding,
}: BindingWidgetInput) {
  const router = useRouter();

  const { _ } = useLingui();
  const toasts = useToasts();

  const { data: currentBinding, error } = useGetBinding({
    id: prefetchedBinding.id,
  });
  const binding = currentBinding ?? prefetchedBinding;

  const initialData = {
    media: binding.mediaId,
    playlist: binding.playlistId,
    rank: binding.rank,
  };

  useEffect(() => {
    if (error) toasts.warning(_(error));
  }, [_, error, toasts]);

  const handleSaveAfterValidation = useCallback(
    async (media: string, playlist: string, rank: string) => {
      const { error: updateError } = await updateBinding({
        data: { media: media, playlist: playlist, rank: rank },
        id: binding.id,
      });

      if (updateError) {
        const translated = _(updateError);
        toasts.error(translated);
        router.refresh();
        return { media: translated, playlist: translated, rank: translated };
      }

      toasts.success(_(msg({ message: "Binding updated successfully" })));
      router.refresh();
    },
    [_, binding, router, toasts],
  );

  const handleSave = useCallback(
    async (data: EditBindingFormData) => {
      if (!data.media)
        return { media: _(msg({ message: "Media is required" })) };

      if (!data.playlist)
        return { playlist: _(msg({ message: "Playlist is required" })) };

      if (!data.rank) return { rank: _(msg({ message: "Rank is required" })) };

      return handleSaveAfterValidation(data.media, data.playlist, data.rank);
    },
    [_, handleSaveAfterValidation],
  );

  const handleDelete = useCallback(async () => {
    const { error: deleteError } = await deleteBinding({ id: binding.id });

    if (deleteError) {
      toasts.error(_(deleteError));
      router.refresh();
    } else {
      toasts.success(_(msg({ message: "Binding deleted successfully" })));
      router.push("/bindings");
    }
  }, [_, binding, router, toasts]);

  return (
    <EditBindingForm
      initialData={initialData}
      onDelete={handleDelete}
      onSave={handleSave}
    />
  );
}
