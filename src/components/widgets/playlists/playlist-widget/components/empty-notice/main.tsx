"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Center, Text } from "@mantine/core";
import { useCallback } from "react";

import { useDrop } from "../../../../../../hooks/use-drop";
import { EmptyNoticeInput } from "./types";

export function EmptyNotice({}: EmptyNoticeInput) {
  const { _ } = useLingui();

  const acceptDrop = useCallback((type: string) => type === "media", []);

  const { ref: dropRef } = useDrop<HTMLDivElement>({
    accept: acceptDrop,
    type: "playlist-empty",
  });

  return (
    <Center p="xs" ref={dropRef}>
      <Text fw="bold">{_(msg({ message: "Playlist is empty." }))}</Text>
    </Center>
  );
}
