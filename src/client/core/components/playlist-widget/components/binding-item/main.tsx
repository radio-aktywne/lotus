import { ActionIcon, Box, Divider, Group, Text } from "@mantine/core";
import { useElementSize, useMergedRef } from "@mantine/hooks";
import { ListItem } from "@radio-aktywne/ui";
import { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { MdClose, MdDownload, MdDragIndicator } from "react-icons/md";
import slugify from "slugify";

import type { BindingItemInput } from "./types";

import { useDrag } from "../../../../../drag-and-drop/hooks/use-drag";
import { useDrop } from "../../../../../drag-and-drop/hooks/use-drop";

export function BindingItem({
  binding,
  index,
  onDelete,
  position,
  total,
}: BindingItemInput) {
  const [deleting, setDeleting] = useState(false);

  const { ref: itemSizeRef, width: itemWidth } = useElementSize();

  const {
    preview: dragPreview,
    ref: handleDragRef,
    state: dragState,
  } = useDrag<HTMLDivElement>({ data: binding, type: "binding" });

  const acceptDrop = useCallback(
    (type: string) => type === "binding" || type === "media",
    [],
  );

  const { ref: itemDropRef, state: dropState } = useDrop<HTMLDivElement>({
    accept: acceptDrop,
    data: binding,
    type: "binding",
  });

  const itemRef = useMergedRef(itemSizeRef, itemDropRef);

  const handleDelete = useCallback(async () => {
    if (deleting || !onDelete) return;

    setDeleting(true);

    try {
      await onDelete();
    } finally {
      setDeleting(false);
    }
  }, [deleting, onDelete]);

  return (
    <>
      <Box pos="relative" ref={itemRef}>
        {dropState.draggingOver && dropState.edge === "top" && (
          <Divider
            color="var(--mantine-primary-color-filled)"
            pos="absolute"
            size="md"
            style={{
              transform: index === 0 ? undefined : "translateY(-50%)",
              zIndex: 1,
            }}
            top={0}
            w="100%"
          />
        )}
        <ListItem>
          <Group gap="xs" opacity={dragState.dragging ? 0.25 : 1}>
            <Box
              display="contents"
              ref={handleDragRef}
              style={{ cursor: "grab" }}
            >
              <MdDragIndicator size="1em" />
            </Box>
            <Text c="dimmed" fw="bold" size="xs">
              {position}.
            </Text>
            <Text fw="bold" size="xs">
              {binding.media.name}
            </Text>
          </Group>
          <ActionIcon
            bd="none"
            component="a"
            download={slugify(binding.media.name)}
            href={`/api/media/${binding.media.id}`}
            size="auto"
            variant="transparent"
          >
            <MdDownload size="1em" />
          </ActionIcon>
          <ActionIcon
            bd="none"
            color="ra-red"
            disabled={deleting || dragState.dragging}
            onClick={handleDelete}
            size="auto"
            variant="transparent"
          >
            <MdClose size="1em" />
          </ActionIcon>
        </ListItem>
        {dropState.draggingOver && dropState.edge === "bottom" && (
          <Divider
            bottom={0}
            color="var(--mantine-primary-color-filled)"
            pos="absolute"
            size="md"
            style={{
              transform: index === total - 1 ? undefined : "translateY(50%)",
              zIndex: 1,
            }}
            w="100%"
          />
        )}
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
              <Text c="dimmed" fw="bold" size="xs">
                {position}.
              </Text>
              <Text fw="bold" size="xs">
                {binding.media.name}
              </Text>
            </Group>
          </ListItem>,
          dragPreview,
        )}
    </>
  );
}
