import { useInterval } from "@mantine/hooks";
import "client-only";
import { useCallback, useEffect, useMemo, useState } from "react";

import { listMedia } from "../../../../actions/pelican/media/list-media";
import {
  UseListMediaInput,
  UseListMediaOutput,
  UseListMediaState,
} from "./types";

export function useListMedia({
  include,
  interval = 1000 * 5,
  limit,
  offset,
  order,
  where,
}: UseListMediaInput = {}): UseListMediaOutput {
  const [state, setState] = useState<UseListMediaState>({ loading: true });

  useEffect(() => {
    setState({ loading: true });
  }, [include, limit, offset, order, where]);

  const refresh = useCallback(async () => {
    const { data, error } = await listMedia({
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
