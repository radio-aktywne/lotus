"use client";

import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { createMedia } from "../../../../actions/pelican/media/create-media";
import { useToasts } from "../../../../hooks/use-toasts";
import {
  CreateMediaForm,
  CreateMediaFormData,
} from "./components/create-media-form";
import { NewMediaWidgetInput } from "./types";

export function NewMediaWidget({}: NewMediaWidgetInput) {
  const router = useRouter();

  const { _ } = useLingui();
  const toasts = useToasts();

  const handleCreateAfterValidation = useCallback(
    async (name: string) => {
      const { data: media, error: createError } = await createMedia({
        name: name,
      });

      if (createError) {
        const translated = _(createError);
        toasts.error(translated);
        router.refresh();
        return { name: translated };
      }

      toasts.success(_(msg({ message: "Media created successfully" })));
      router.push(`/media/${media.id}`);
    },
    [_, router, toasts],
  );

  const handleCreate = useCallback(
    async (data: CreateMediaFormData) => {
      if (!data.name) return { name: _(msg({ message: "Name is required" })) };

      return handleCreateAfterValidation(data.name);
    },
    [_, handleCreateAfterValidation],
  );

  return <CreateMediaForm onCreate={handleCreate} />;
}
