import { ActionIcon, Text, UnstyledButton } from "@mantine/core";
import Link from "next/link";
import { MdDelete } from "react-icons/md";

import { PlaylistItemInput } from "./types";
import { formatDisplayName } from "./utils";

export function PlaylistItem({ onDelete, playlist }: PlaylistItemInput) {
  return (
    <>
      <UnstyledButton component={Link} href={`/playlists/${playlist.id}`}>
        <Text fw="bold" size="xs">
          {formatDisplayName(playlist)}
        </Text>
      </UnstyledButton>
      <ActionIcon
        bd="none"
        color="ra-red"
        onClick={onDelete}
        size="auto"
        variant="transparent"
      >
        <MdDelete size="1em" />
      </ActionIcon>
    </>
  );
}
