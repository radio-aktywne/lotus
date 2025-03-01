"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Button, Stack } from "@mantine/core";
import Link from "next/link";

import { RootPageViewInput } from "./types";

export function RootPageView({}: RootPageViewInput) {
  const { _ } = useLingui();

  return (
    <Stack>
      <Button component={Link} href="/media">
        {_(msg({ message: "Media" }))}
      </Button>
      <Button component={Link} href="/playlists">
        {_(msg({ message: "Playlists" }))}
      </Button>
      <Button component={Link} href="/bindings">
        {_(msg({ message: "Bindings" }))}
      </Button>
    </Stack>
  );
}
