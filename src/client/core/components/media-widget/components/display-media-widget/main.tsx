import { msg } from "@lingui/core/macro";
import { Button, Stack, Text, Title } from "@mantine/core";
import { List } from "@radio-aktywne/ui";
import { useDeepCompareMemo } from "use-deep-compare";

import type { DisplayMediaWidgetInput } from "./types";

import { useLocalization } from "../../../../../../isomorphic/localization/hooks/use-localization";
import { Controls } from "./components/controls";
import { MediaItem } from "./components/media-item";

export function DisplayMediaWidget({
  limit,
  media,
  onDelete,
  onEdit,
  onPageChange,
  onQueryChange,
  onUpload,
  page,
  query,
  total,
}: DisplayMediaWidgetInput) {
  const { localization } = useLocalization();

  const mediaIds = media.map((m) => m.id);

  const deleteHandlers = useDeepCompareMemo(
    () => mediaIds.map((id) => async () => await onDelete?.(id)),
    [mediaIds, onDelete],
  );

  const editHandlers = useDeepCompareMemo(
    () => mediaIds.map((id) => () => onEdit?.(id)),
    [mediaIds, onEdit],
  );

  return (
    <Stack h="100%" w="100%">
      <Title ta="center">
        {localization.localize(msg({ message: "Media" }))}
      </Title>
      <Controls
        onPageChange={onPageChange}
        onQueryChange={onQueryChange}
        page={page}
        pages={Math.ceil(total / limit)}
        query={query}
      />
      {total === 0 ? (
        <Text py="sm" size="xs" ta="center">
          {localization.localize(msg({ message: "No media" }))}
        </Text>
      ) : (
        <List style={{ overflowY: "auto" }}>
          {media.map((m, index) => (
            <MediaItem
              index={index}
              key={m.id}
              media={m}
              onDelete={deleteHandlers[index]}
              onEdit={editHandlers[index]}
            />
          ))}
        </List>
      )}
      <Button mt="auto" onClick={onUpload} style={{ flexShrink: 0 }}>
        {localization.localize(msg({ message: "Upload" }))}
      </Button>
    </Stack>
  );
}
