import { msg } from "@lingui/core/macro";
import { Group, Pagination, TextInput } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { MdSearch } from "react-icons/md";

import type { ControlsInput } from "./types";

import { useLocalization } from "../../../../../../../../isomorphic/localization/hooks/use-localization";

export function Controls({
  onPageChange,
  onQueryChange,
  page,
  pages,
  query,
}: ControlsInput) {
  const { localization } = useLocalization();

  const handleQueryChange = useDebouncedCallback((query: string) => {
    onQueryChange?.(query);
  }, 200);

  return (
    <Group gap="xs" w="100%" wrap="nowrap">
      <TextInput
        defaultValue={query}
        leftSection={<MdSearch />}
        leftSectionPointerEvents="none"
        onChange={(e) => handleQueryChange(e.currentTarget.value)}
        placeholder={localization.localize(msg({ message: "Search media" }))}
        w="100%"
      />
      <Pagination.Root
        disabled={pages <= 1}
        onChange={onPageChange}
        total={pages}
        value={page}
      >
        <Group gap="xs" wrap="nowrap">
          <Pagination.Previous />
          <Pagination.Next />
        </Group>
      </Pagination.Root>
    </Group>
  );
}
