"use client";

import { Button } from "@mantine/core";

import { useHeadMediaContent } from "../../../../../../hooks/pelican/media/content/use-head-media-content";
import { DownloadButtonInput } from "./types";

export function DownloadButton({ label, media }: DownloadButtonInput) {
  const { error } = useHeadMediaContent({ id: media.id });

  const exists = error === undefined;

  return (
    <Button
      component="a"
      data-disabled={!exists}
      download={media.name}
      href={`/api/media/${media.id}`}
      onClick={(event) => exists || event.preventDefault()}
    >
      {label}
    </Button>
  );
}
