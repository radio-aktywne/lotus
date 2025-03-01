import { useInterval } from "@mantine/hooks";
import "client-only";
import { useCallback, useEffect, useMemo, useState } from "react";

import { listPlaylists } from "../../../../actions/pelican/playlists/list-playlists";
import {
  UseListPlaylistsInput,
  UseListPlaylistsOutput,
  UseListPlaylistsState,
} from "./types";

export function useListPlaylists({
  include,
  interval = 1000 * 5,
  limit,
  offset,
  order,
  where,
}: UseListPlaylistsInput = {}): UseListPlaylistsOutput {
  const [state, setState] = useState<UseListPlaylistsState>({ loading: true });

  const refresh = useCallback(async () => {
    const { data, error } = await listPlaylists({
      include: include,
      limit: limit,
      offset: offset,
      order: order,
      where: where,
    });
    if (error) setState({ error: error, loading: false });
    else setState({ data: data, loading: false });
  }, [include, limit, offset, order, where]);

  const { start, stop } = useInterval(refresh, interval);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    start();
    return stop;
  }, [start, stop]);

  return useMemo(() => ({ ...state, refresh }), [state, refresh]);
}
