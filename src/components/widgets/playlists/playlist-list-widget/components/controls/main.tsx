"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Group, Pagination, TextInput } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { useCallback } from "react";
import { MdSearch } from "react-icons/md";

import { ControlsInput } from "./types";

export function Controls({
  onPageChange,
  onQueryChange,
  page,
  pages,
  query,
}: ControlsInput) {
  const { _ } = useLingui();

  const handlePageChange = useCallback(
    (page: number) => {
      onPageChange?.(page);
    },
    [onPageChange],
  );

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
        placeholder={_(msg({ message: "Search playlists" }))}
        w="100%"
      />
      <Pagination.Root
        disabled={pages <= 1}
        onChange={handlePageChange}
        total={pages}
        value={page ?? 1}
      >
        <Group gap="xs" wrap="nowrap">
          <Pagination.Previous />
          <Pagination.Next />
        </Group>
      </Pagination.Root>
    </Group>
  );
}
