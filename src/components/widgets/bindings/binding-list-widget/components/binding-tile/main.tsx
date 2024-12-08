import { Group, Title, UnstyledButton } from "@mantine/core";
import Link from "next/link";

import { BindingTileInput } from "./types";

export function BindingTile({ binding }: BindingTileInput) {
  return (
    <UnstyledButton component={Link} href={`/bindings/${binding.id}`}>
      <Group grow>
        <Title ta="center">{binding.id}</Title>
      </Group>
    </UnstyledButton>
  );
}
