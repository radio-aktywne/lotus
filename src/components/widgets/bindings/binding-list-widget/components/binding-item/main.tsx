import { Text } from "@mantine/core";

import { BindingItemInput } from "./types";

export function BindingItem({ binding }: BindingItemInput) {
  return (
    <Text fw="bold" size="xs">
      {binding.id}
    </Text>
  );
}
