"use client";

import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Stack, Title } from "@mantine/core";

import { AuthErrorPageViewInput } from "./types";

export function AuthErrorPageView({}: AuthErrorPageViewInput) {
  const { _ } = useLingui();

  return (
    <Stack>
      <Title>{_(msg({ message: "Error in auth flow" }))}</Title>
    </Stack>
  );
}
