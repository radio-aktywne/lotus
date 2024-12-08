import { Group, Title, UnstyledButton } from "@mantine/core";
import Link from "next/link";

import { MediaTileInput } from "./types";

export function MediaTile({ media }: MediaTileInput) {
  return (
    <UnstyledButton component={Link} href={`/media/${media.id}`}>
      <Group grow>
        <Title ta="center">{media.id}</Title>
      </Group>
    </UnstyledButton>
  );
}
