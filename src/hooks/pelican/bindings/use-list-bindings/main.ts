import { useInterval } from "@mantine/hooks";
import "client-only";
import { useCallback, useEffect, useMemo, useState } from "react";

import { listBindings } from "../../../../actions/pelican/bindings/list-bindings";
import {
  UseListBindingsInput,
  UseListBindingsOutput,
  UseListBindingsState,
} from "./types";

export function useListBindings({
  include,
  interval = 1000 * 5,
  limit,
  offset,
  order,
  where,
}: UseListBindingsInput = {}): UseListBindingsOutput {
  const [state, setState] = useState<UseListBindingsState>({ loading: true });

  const refresh = useCallback(async () => {
    const { data, error } = await listBindings({
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
    refresh();
  }, [refresh]);

  useEffect(() => {
    start();
    return stop;
  }, [start, stop]);

  return useMemo(() => ({ ...state, refresh }), [state, refresh]);
}
