import { ActionIcon, Text } from "@mantine/core";
import { MdDelete, MdDownload } from "react-icons/md";

import { BindingItemInput } from "./types";
import { formatDisplayName, formatFilename } from "./utils";

export function BindingItem({ binding, onRemove }: BindingItemInput) {
  return (
    <>
      <Text fw="bold" size="xs">
        {formatDisplayName(binding)}
      </Text>
      <ActionIcon
        component="a"
        download={formatFilename(binding)}
        href={`/api/media/${binding.media!.id}`}
        size="auto"
        variant="transparent"
      >
        <MdDownload size="1em" />
      </ActionIcon>
      <ActionIcon
        color="ra-red"
        onClick={onRemove}
        size="auto"
        variant="transparent"
      >
        <MdDelete size="1em" />
      </ActionIcon>
    </>
  );
}
