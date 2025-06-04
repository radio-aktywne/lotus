import { Text } from "@mantine/core";

import { PlaylistItemInput } from "./types";

export function PlaylistItem({ playlist }: PlaylistItemInput) {
  return (
    <Text fw="bold" size="xs">
      {playlist.id}
    </Text>
  );
}
