import { useInterval } from "@mantine/hooks";
import "client-only";
import { useCallback, useEffect, useMemo, useState } from "react";

import { getPlaylist } from "../../../../actions/pelican/playlists/get-playlist";
import {
  UseGetPlaylistInput,
  UseGetPlaylistOutput,
  UseGetPlaylistState,
} from "./types";

export function useGetPlaylist({
  id,
  include,
  interval = 1000 * 5,
}: UseGetPlaylistInput): UseGetPlaylistOutput {
  const [state, setState] = useState<UseGetPlaylistState>({ loading: true });

  const refresh = useCallback(async () => {
    const { data, error } = await getPlaylist({ id: id, include: include });
    if (error) setState({ error: error, loading: false });
    else setState({ data: data, loading: false });
  }, [id, include]);

  const { start, stop } = useInterval(refresh, interval);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    start();
    return stop;
  }, [start, stop]);

  return useMemo(() => ({ ...state, refresh }), [state, refresh]);
}
