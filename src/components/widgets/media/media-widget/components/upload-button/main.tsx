"use client";

import { Button, FileButton } from "@mantine/core";
import { useCallback, useState } from "react";

import { useHeadMediaContent } from "../../../../../../hooks/pelican/media/content/use-head-media-content";
import { UploadButtonInput } from "./types";

export function UploadButton({ label, media, onUpload }: UploadButtonInput) {
  const [uploading, setUploading] = useState(false);

  const { refresh } = useHeadMediaContent({ id: media.id });

  const handleUpload = useCallback(
    async (file: File | null) => {
      setUploading(true);
      try {
        await onUpload?.(file);
      } finally {
        setUploading(false);
        refresh();
      }
    },
    [onUpload, refresh],
  );

  return (
    <FileButton disabled={uploading} onChange={handleUpload}>
      {(props) => (
        <Button loading={uploading} {...props}>
          {label}
        </Button>
      )}
    </FileButton>
  );
}
