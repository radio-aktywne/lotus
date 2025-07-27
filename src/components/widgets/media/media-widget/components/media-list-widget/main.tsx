"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Button, Center, Stack, Title } from "@mantine/core";
import { List } from "@radio-aktywne/ui";
import { useCallback } from "react";

import { deleteMedia } from "../../../../../../actions/pelican/media/delete-media";
import { useToasts } from "../../../../../../hooks/use-toasts";
import { MediaItem } from "./components/media-item";
import { MediaListWidgetInput } from "./types";

export function MediaListWidget({
  media,
  onDelete,
  onEdit,
  onUpload,
}: MediaListWidgetInput) {
  const { _ } = useLingui();
  const toasts = useToasts();

  const handleDelete = useCallback(
    async (m: (typeof media)["media"][number]) => {
      const { error } = await deleteMedia({ id: m.id });

      if (error) toasts.error(_(error));
      else toasts.success(_(msg({ message: "Media deleted." })));

      onDelete?.(m);
    },
    [_, onDelete, toasts],
  );

  const handleEdit = useCallback(
    (m: (typeof media)["media"][number]) => {
      onEdit?.(m);
    },
    [onEdit],
  );

  return (
    <Stack mah="100%" w="100%">
      {media.count === 0 ? (
        <Center>
          <Title>{_(msg({ message: "No media." }))}</Title>
        </Center>
      ) : (
        <>
          <Center>
            <Title>{_(msg({ message: "Media" }))}</Title>
          </Center>
          <List style={{ overflowY: "auto" }}>
            {media.media.map((m, index) => (
              <MediaItem
                index={index}
                key={m.id}
                media={m}
                onDelete={() => handleDelete(m)}
                onEdit={() => handleEdit(m)}
              />
            ))}
          </List>
        </>
      )}
      <Button onClick={onUpload}>{_(msg({ message: "Upload" }))}</Button>
    </Stack>
  );
}
