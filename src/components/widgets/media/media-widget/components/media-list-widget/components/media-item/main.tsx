"use client";

import { ActionIcon, Box, Group, Text, UnstyledButton } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { ListItem } from "@radio-aktywne/ui";
import { createPortal } from "react-dom";
import { MdDelete, MdDownload, MdDragIndicator } from "react-icons/md";

import { useDrag } from "../../../../../../../../hooks/use-drag";
import { MediaItemInput } from "./types";
import { formatDisplayName, formatFilename } from "./utils";

export function MediaItem({ index, media, onDelete, onEdit }: MediaItemInput) {
  const { ref: itemSizeRef, width: itemWidth } = useElementSize();

  const { preview: dragPreview, ref: handleDragRef } = useDrag<HTMLDivElement>({
    data: media,
    type: "media",
  });

  return (
    <>
      <Box pos="relative" ref={itemSizeRef}>
        <ListItem>
          <Group gap="xs">
            <Box
              display="contents"
              ref={handleDragRef}
              style={{ cursor: "grab" }}
            >
              <MdDragIndicator size="1em" />
            </Box>
            <UnstyledButton onClick={onEdit}>
              <Text fw="bold" size="xs">
                {formatDisplayName(media)}
              </Text>
            </UnstyledButton>
          </Group>
          <ActionIcon
            bd="none"
            component="a"
            download={formatFilename(media)}
            href={`/api/media/${media.id}`}
            size="auto"
            variant="transparent"
          >
            <MdDownload size="1em" />
          </ActionIcon>
          <ActionIcon
            bd="none"
            color="ra-red"
            onClick={onDelete}
            size="auto"
            variant="transparent"
          >
            <MdDelete size="1em" />
          </ActionIcon>
        </ListItem>
      </Box>
      {dragPreview &&
        createPortal(
          <ListItem
            bg={
              index % 2 === 0
                ? "var(--mantine-color-default-alternative)"
                : "var(--mantine-color-default)"
            }
            w={itemWidth}
          >
            <Group gap="xs">
              <MdDragIndicator size="1em" />
              <Text fw="bold" size="xs">
                {formatDisplayName(media)}
              </Text>
            </Group>
          </ListItem>,
          dragPreview,
        )}
    </>
  );
}
