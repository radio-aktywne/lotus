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

import { useListPlaylists } from "../../../../hooks/pelican/playlists/use-list-playlists";
import { useToasts } from "../../../../hooks/use-toasts";
import { PlaylistItem } from "./components/playlist-item";
import { PlaylistListWidgetInput } from "./types";

export function PlaylistListWidget({
  playlists: prefetchedPlaylists,
  where,
}: PlaylistListWidgetInput) {
  const { _ } = useLingui();
  const toasts = useToasts();

  const { data: currentPlaylists, error } = useListPlaylists({ where: where });
  const playlists = currentPlaylists ?? prefetchedPlaylists;

  useEffect(() => {
    if (error) toasts.warning(_(error));
  }, [_, error, toasts]);

  if (playlists.count === 0) {
    return <Title>{_(msg({ message: "No playlists." }))}</Title>;
  }

  return (
    <Stack mah="100%" w="100%">
      <Center>
        <Group>
          <Title>{_(msg({ message: "Playlists" }))}</Title>
          <ActionIcon
            component={Link}
            href={`/playlists/new`}
            size="auto"
            variant="transparent"
          >
            <MdAddCircleOutline size="2em" />
          </ActionIcon>
        </Group>
      </Center>
      <List style={{ overflowY: "auto" }}>
        {playlists.playlists.map((playlist) => (
          <ListItem key={playlist.id}>
            <UnstyledButton component={Link} href={`/playlists/${playlist.id}`}>
              <PlaylistItem playlist={playlist} />
            </UnstyledButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
