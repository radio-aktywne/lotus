import { ActionIcon, Text, UnstyledButton } from "@mantine/core";
import { MdDelete, MdDownload } from "react-icons/md";

import { MediaItemInput } from "./types";
import { formatDisplayName, formatFilename } from "./utils";

export function MediaItem({ media, onDelete, onEdit }: MediaItemInput) {
  return (
    <>
      <UnstyledButton onClick={onEdit}>
        <Text fw="bold" size="xs">
          {formatDisplayName(media)}
        </Text>
      </UnstyledButton>
      <ActionIcon
        component="a"
        download={formatFilename(media)}
        href={`/api/media/${media.id}`}
        size="auto"
        variant="transparent"
      >
        <MdDownload size="1em" />
      </ActionIcon>
      <ActionIcon
        color="ra-red"
        onClick={onDelete}
        size="auto"
        variant="transparent"
      >
        <MdDelete size="1em" />
      </ActionIcon>
    </>
  );
}
