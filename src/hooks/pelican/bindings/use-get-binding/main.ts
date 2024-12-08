import { useInterval } from "@mantine/hooks";
import "client-only";
import { useCallback, useEffect, useMemo, useState } from "react";

import { getBinding } from "../../../../actions/pelican/bindings/get-binding";
import {
  UseGetBindingInput,
  UseGetBindingOutput,
  UseGetBindingState,
} from "./types";

export function useGetBinding({
  id,
  include,
  interval = 1000 * 5,
}: UseGetBindingInput): UseGetBindingOutput {
  const [state, setState] = useState<UseGetBindingState>({ loading: true });

  const refresh = useCallback(async () => {
    const { data, error } = await getBinding({ id: id, include: include });
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
