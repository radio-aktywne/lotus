import { Text } from "@mantine/core";

import { MediaItemInput } from "./types";

export function MediaItem({ media }: MediaItemInput) {
  return (
    <Text fw="bold" size="xs">
      {media.id}
    </Text>
  );
}
