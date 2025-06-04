"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Title } from "@mantine/core";

import { MediaNotFoundViewInput } from "./types";

export function MediaNotFoundView({}: MediaNotFoundViewInput) {
  const { _ } = useLingui();

  return <Title>{_(msg({ message: "Media not found." }))}</Title>;
}
