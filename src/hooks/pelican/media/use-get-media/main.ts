import { useInterval } from "@mantine/hooks";
import "client-only";
import { useCallback, useEffect, useMemo, useState } from "react";

import { getMedia } from "../../../../actions/pelican/media/get-media";
import { UseGetMediaInput, UseGetMediaOutput, UseGetMediaState } from "./types";

export function useGetMedia({
  id,
  include,
  interval = 1000 * 5,
}: UseGetMediaInput): UseGetMediaOutput {
  const [state, setState] = useState<UseGetMediaState>({ loading: true });

  const refresh = useCallback(async () => {
    const { data, error } = await getMedia({ id: id, include: include });
    if (error) setState({ error: error, loading: false });
    else setState({ data: data, loading: false });
  }, [id, include]);

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
