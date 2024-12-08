"use client";

import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { createBinding } from "../../../../actions/pelican/bindings/create-binding";
import { useToasts } from "../../../../hooks/use-toasts";
import {
  CreateBindingForm,
  CreateBindingFormData,
} from "./components/create-binding-form";
import { NewBindingWidgetInput } from "./types";

export function NewBindingWidget({}: NewBindingWidgetInput) {
  const router = useRouter();

  const { _ } = useLingui();
  const toasts = useToasts();

  const handleCreateAfterValidation = useCallback(
    async (media: string, playlist: string, rank: string) => {
      const { data: binding, error: createError } = await createBinding({
        media: media,
        playlist: playlist,
        rank: rank,
      });

      if (createError) {
        const translated = _(createError);
        toasts.error(translated);
        router.refresh();
        return { media: translated, playlist: translated, rank: translated };
      }

      toasts.success(_(msg({ message: "Binding created successfully" })));
      router.push(`/bindings/${binding.id}`);
    },
    [_, router, toasts],
  );

  const handleCreate = useCallback(
    async (data: CreateBindingFormData) => {
      if (!data.media)
        return { media: _(msg({ message: "Media is required" })) };

      if (!data.playlist)
        return { playlist: _(msg({ message: "Playlist is required" })) };

      if (!data.rank) return { rank: _(msg({ message: "Rank is required" })) };

      return handleCreateAfterValidation(data.media, data.playlist, data.rank);
    },
    [_, handleCreateAfterValidation],
  );

  return <CreateBindingForm onCreate={handleCreate} />;
}
