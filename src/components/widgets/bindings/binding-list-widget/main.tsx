"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Button, Center, Pagination, Stack, Title } from "@mantine/core";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useListBindings } from "../../../../hooks/pelican/bindings/use-list-bindings";
import { useToasts } from "../../../../hooks/use-toasts";
import { BindingTile } from "./components/binding-tile";
import { BindingListWidgetInput } from "./types";

export function BindingListWidget({
  bindings: prefetchedBindings,
  perPage = 5,
  where,
}: BindingListWidgetInput) {
  const [page, setPage] = useState(1);

  const { _ } = useLingui();
  const toasts = useToasts();

  const limit = perPage;
  const offset = perPage * (page - 1);
  const { data: currentBindings, error } = useListBindings({
    limit: limit,
    offset: offset,
    where: where,
  });
  const bindings = currentBindings ?? prefetchedBindings;

  useEffect(() => {
    if (error) toasts.warning(_(error));
  }, [_, error, toasts]);

  if (bindings.count === 0) {
    return <Title>{_(msg({ message: "No bindings." }))}</Title>;
  }

  const pages = Math.ceil(bindings.count / perPage);

  return (
    <Stack>
      <Stack>
        {bindings.bindings.map((binding) => (
          <BindingTile binding={binding} key={binding.id} />
        ))}
      </Stack>
      <Center>
        <Stack>
          <Pagination onChange={setPage} total={pages} value={page} withEdges />
          <Button component={Link} href={"/bindings/new"}>
            {_(msg({ message: "Create" }))}
          </Button>
        </Stack>
      </Center>
    </Stack>
  );
}
