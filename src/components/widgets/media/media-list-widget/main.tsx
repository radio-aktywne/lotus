"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import {
  ActionIcon,
  Center,
  Group,
  Stack,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { List, ListItem } from "@radio-aktywne/ui";
import Link from "next/link";
import { useEffect } from "react";
import { MdAddCircleOutline } from "react-icons/md";

import { useListMedia } from "../../../../hooks/pelican/media/use-list-media";
import { useToasts } from "../../../../hooks/use-toasts";
import { MediaItem } from "./components/media-item";
import { MediaListWidgetInput } from "./types";

export function MediaListWidget({
  media: prefetchedMedia,
  where,
}: MediaListWidgetInput) {
  const { _ } = useLingui();
  const toasts = useToasts();

  const { data: currentMedia, error } = useListMedia({ where: where });
  const media = currentMedia ?? prefetchedMedia;

  useEffect(() => {
    if (error) toasts.warning(_(error));
  }, [_, error, toasts]);

  if (media.count === 0) {
    return <Title>{_(msg({ message: "No media." }))}</Title>;
  }

  return (
    <Stack mah="100%" w="100%">
      <Center>
        <Group>
          <Title>{_(msg({ message: "Media" }))}</Title>
          <ActionIcon
            component={Link}
            href={`/media/new`}
            size="auto"
            variant="transparent"
          >
            <MdAddCircleOutline size="2em" />
          </ActionIcon>
        </Group>
      </Center>
      <List style={{ overflowY: "auto" }}>
        {media.media.map((m) => (
          <ListItem key={m.id}>
            <UnstyledButton component={Link} href={`/media/${m.id}`}>
              <MediaItem media={m} />
            </UnstyledButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
