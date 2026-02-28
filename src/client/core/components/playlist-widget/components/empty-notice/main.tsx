import { msg } from "@lingui/core/macro";
import { Text } from "@mantine/core";
import { Center } from "@radio-aktywne/ui";
import { useCallback } from "react";

import type { EmptyNoticeInput } from "./types";

import { useLocalization } from "../../../../../../isomorphic/localization/hooks/use-localization";
import { useDrop } from "../../../../../drag-and-drop/hooks/use-drop";

export function EmptyNotice({}: EmptyNoticeInput) {
  const { localization } = useLocalization();

  const acceptDrop = useCallback((type: string) => type === "media", []);

  const { ref: dropRef, state: dropState } = useDrop<HTMLDivElement>({
    accept: acceptDrop,
    type: "empty-playlist",
  });

  return (
    <Center
      py="xs"
      ref={dropRef}
      style={{
        borderColor: dropState.draggingOver
          ? "var(--mantine-primary-color-filled)"
          : "transparent",
        borderStyle: "dashed",
        height: "auto",
        overflow: "unset",
      }}
    >
      <Text size="xs">
        {localization.localize(msg({ message: "No media" }))}
      </Text>
    </Center>
  );
}
