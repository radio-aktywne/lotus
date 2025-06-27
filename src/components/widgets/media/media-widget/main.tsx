"use client";

import { useLingui } from "@lingui/react";
import { useCallback, useEffect, useState } from "react";

import { useListMedia } from "../../../../hooks/pelican/media/use-list-media";
import { useToasts } from "../../../../hooks/use-toasts";
import { EditMediaWidget } from "./components/edit-media-widget";
import { MediaListWidget } from "./components/media-list-widget";
import { UploadMediaWidget } from "./components/upload-media-widget";
import { MediaWidgetInput, MediaWidgetState } from "./types";

export function MediaWidget({
  media: prefetchedMedia,
  ...props
}: MediaWidgetInput) {
  const [state, setState] = useState<MediaWidgetState>({ state: "display" });

  const { _ } = useLingui();
  const toasts = useToasts();

  const { data: currentMedia, error, refresh } = useListMedia(props);
  const media = currentMedia ?? prefetchedMedia;

  useEffect(() => {
    if (error) toasts.warning(_(error));
  }, [_, error, toasts]);

  const handleUploadSwitch = useCallback(() => {
    setState({ state: "upload" });
  }, []);

  const handleDelete = useCallback(() => {
    void refresh();
  }, [refresh]);

  const handleEdit = useCallback((m: (typeof media)["media"][number]) => {
    setState({ media: m, state: "edit" });
  }, []);

  const handleEditSave = useCallback(() => {
    setState({ state: "display" });
    void refresh();
  }, [refresh]);

  const handleEditCancel = useCallback(() => {
    setState({ state: "display" });
  }, []);

  const handleUpload = useCallback(() => {
    setState({ state: "display" });
    void refresh();
  }, [refresh]);

  const handleCancelUpload = useCallback(() => {
    setState({ state: "display" });
  }, []);

  return (() => {
    switch (state.state) {
      case "display":
        return (
          <MediaListWidget
            media={media}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onUpload={handleUploadSwitch}
          />
        );
      case "edit":
        return (
          <EditMediaWidget
            media={state.media}
            onCancel={handleEditCancel}
            onSave={handleEditSave}
          />
        );
      case "upload":
        return (
          <UploadMediaWidget
            onCancel={handleCancelUpload}
            onUpload={handleUpload}
          />
        );
    }
  })();
}
