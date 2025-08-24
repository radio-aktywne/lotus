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
  const [page, setPage] = useState<number>();
  const [query, setQuery] = useState<string>();

  const { _ } = useLingui();
  const toasts = useToasts();

  const {
    data: currentMedia,
    error,
    refresh,
  } = useListMedia({
    ...props,
    offset: page ? (page - 1) * props.limit : undefined,
    where: JSON.stringify({
      ...(props.where ? JSON.parse(props.where) : {}),
      ...(query
        ? {
            name: {
              contains: query,
              mode: "insensitive",
            },
          }
        : {}),
    }),
  });
  const media = query ? currentMedia : (currentMedia ?? prefetchedMedia);

  useEffect(() => {
    if (error) toasts.warning(_(error));
  }, [_, error, toasts]);

  useEffect(() => {
    if (media === undefined || page === undefined) return;

    const pages = Math.ceil(media.count / props.limit);
    if (page > pages) setPage(Math.max(1, pages));
  }, [page, media, props.limit]);

  const handleDisplayDelete = useCallback(() => {
    void refresh();
  }, [refresh]);

  const handleDisplayEdit = useCallback(
    (m: NonNullable<typeof media>["media"][number]) => {
      setState({ media: m, state: "edit" });
    },
    [],
  );

  const handleDisplayPageChange = useCallback((page: number) => {
    setPage(page);
  }, []);

  const handleDisplayQueryChange = useCallback((query: string) => {
    setPage(1);
    setQuery(query || undefined);
  }, []);

  const handleDisplayUpload = useCallback(() => {
    setState({ state: "upload" });
  }, []);

  const handleEditCancel = useCallback(() => {
    setState({ state: "display" });
  }, []);

  const handleEditSave = useCallback(() => {
    setState({ state: "display" });
    void refresh();
  }, [refresh]);

  const handleUploadCancel = useCallback(() => {
    setState({ state: "display" });
  }, []);

  const handleUploadUpload = useCallback(() => {
    setState({ state: "display" });
    void refresh();
  }, [refresh]);

  return (() => {
    switch (state.state) {
      case "display":
        return (
          <MediaListWidget
            media={media}
            onDelete={handleDisplayDelete}
            onEdit={handleDisplayEdit}
            onPageChange={handleDisplayPageChange}
            onQueryChange={handleDisplayQueryChange}
            onUpload={handleDisplayUpload}
            page={page}
            perPage={props.limit}
            query={query}
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
            onCancel={handleUploadCancel}
            onUpload={handleUploadUpload}
          />
        );
    }
  })();
}
