import { Group, Title, UnstyledButton } from "@mantine/core";
import Link from "next/link";

import { PlaylistTileInput } from "./types";

export function PlaylistTile({ playlist }: PlaylistTileInput) {
  return (
    <UnstyledButton component={Link} href={`/playlists/${playlist.id}`}>
      <Group grow>
        <Title ta="center">{playlist.id}</Title>
      </Group>
    </UnstyledButton>
  );
}
