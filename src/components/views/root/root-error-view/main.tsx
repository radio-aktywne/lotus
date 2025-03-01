"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Button, Stack, Title } from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";

import { RootErrorViewInput } from "./types";

export function RootErrorView({ onRetry }: RootErrorViewInput) {
  const { _ } = useLingui();

  return (
    <Stack>
      <Title>{_(msg({ message: "Something went wrong" }))}</Title>
      <Button
        color="gray"
        leftSection={<IconRefresh />}
        onClick={onRetry}
        variant="subtle"
      >
        {_(msg({ message: "Retry" }))}
      </Button>
    </Stack>
  );
}
