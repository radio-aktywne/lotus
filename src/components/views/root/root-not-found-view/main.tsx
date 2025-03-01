"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Title } from "@mantine/core";

import { RootNotFoundViewInput } from "./types";

export function RootNotFoundView({}: RootNotFoundViewInput) {
  const { _ } = useLingui();

  return <Title>{_(msg({ message: "Page not found" }))}</Title>;
}
