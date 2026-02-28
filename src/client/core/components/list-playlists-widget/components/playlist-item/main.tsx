import { ActionIcon, Group, Text, UnstyledButton } from "@mantine/core";
import { ListItem } from "@radio-aktywne/ui";
import Link from "next/link";
import { useCallback, useState } from "react";
import { MdDelete } from "react-icons/md";

import type { PlaylistItemInput } from "./types";

export function PlaylistItem({ onDelete, playlist }: PlaylistItemInput) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = useCallback(async () => {
    if (deleting || !onDelete) return;

    setDeleting(true);

    try {
      await onDelete();
    } finally {
      setDeleting(false);
    }
  }, [deleting, onDelete]);

  return (
    <ListItem>
      <Group gap="xs">
        <UnstyledButton component={Link} href={`/playlists/${playlist.id}`}>
          <Text fw="bold" size="xs">
            {playlist.name}
          </Text>
        </UnstyledButton>
      </Group>
      <ActionIcon
        bd="none"
        color="ra-red"
        disabled={deleting}
        onClick={handleDelete}
        size="auto"
        variant="transparent"
      >
        <MdDelete size="1em" />
      </ActionIcon>
    </ListItem>
  );
}
