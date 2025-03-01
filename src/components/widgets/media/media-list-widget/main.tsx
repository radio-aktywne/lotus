"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Button, Center, Pagination, Stack, Title } from "@mantine/core";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useListMedia } from "../../../../hooks/pelican/media/use-list-media";
import { useToasts } from "../../../../hooks/use-toasts";
import { MediaTile } from "./components/media-tile";
import { MediaListWidgetInput } from "./types";

export function MediaListWidget({
  media: prefetchedMedia,
  perPage = 5,
  where,
}: MediaListWidgetInput) {
  const [page, setPage] = useState(1);

  const { _ } = useLingui();
  const toasts = useToasts();

  const limit = perPage;
  const offset = perPage * (page - 1);
  const { data: currentMedia, error } = useListMedia({
    limit: limit,
    offset: offset,
    where: where,
  });
  const media = currentMedia ?? prefetchedMedia;

  useEffect(() => {
    if (error) toasts.warning(_(error));
  }, [_, error, toasts]);

  if (media.count === 0) {
    return <Title>{_(msg({ message: "No media." }))}</Title>;
  }

  const pages = Math.ceil(media.count / perPage);

  return (
    <Stack>
      <Stack>
        {media.media.map((m) => (
          <MediaTile key={m.id} media={m} />
        ))}
      </Stack>
      <Center>
        <Stack>
          <Pagination onChange={setPage} total={pages} value={page} withEdges />
          <Button component={Link} href={"/media/new"}>
            {_(msg({ message: "Create" }))}
          </Button>
        </Stack>
      </Center>
    </Stack>
  );
}
