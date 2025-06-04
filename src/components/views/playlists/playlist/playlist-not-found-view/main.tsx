"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Title } from "@mantine/core";

import { PlaylistNotFoundViewInput } from "./types";

export function PlaylistNotFoundView({}: PlaylistNotFoundViewInput) {
  const { _ } = useLingui();

  return <Title>{_(msg({ message: "Playlist not found." }))}</Title>;
}
