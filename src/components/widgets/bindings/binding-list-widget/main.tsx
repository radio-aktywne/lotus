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

import { useListBindings } from "../../../../hooks/pelican/bindings/use-list-bindings";
import { useToasts } from "../../../../hooks/use-toasts";
import { BindingItem } from "./components/binding-item";
import { BindingListWidgetInput } from "./types";

export function BindingListWidget({
  bindings: prefetchedBindings,
  where,
}: BindingListWidgetInput) {
  const { _ } = useLingui();
  const toasts = useToasts();

  const { data: currentBindings, error } = useListBindings({ where: where });
  const bindings = currentBindings ?? prefetchedBindings;

  useEffect(() => {
    if (error) toasts.warning(_(error));
  }, [_, error, toasts]);

  if (bindings.count === 0) {
    return <Title>{_(msg({ message: "No bindings." }))}</Title>;
  }

  return (
    <Stack mah="100%" w="100%">
      <Center>
        <Group>
          <Title>{_(msg({ message: "Bindings" }))}</Title>
          <ActionIcon
            component={Link}
            href={`/bindings/new`}
            size="auto"
            variant="transparent"
          >
            <MdAddCircleOutline size="2em" />
          </ActionIcon>
        </Group>
      </Center>
      <List style={{ overflowY: "auto" }}>
        {bindings.bindings.map((binding) => (
          <ListItem key={binding.id}>
            <UnstyledButton component={Link} href={`/bindings/${binding.id}`}>
              <BindingItem binding={binding} />
            </UnstyledButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
