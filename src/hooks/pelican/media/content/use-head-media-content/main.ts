import { useInterval } from "@mantine/hooks";
import "client-only";
import { useCallback, useEffect, useMemo, useState } from "react";

import { headMediaContent } from "../../../../../actions/pelican/media/content/head-media-content";
import {
  UseHeadMediaContentInput,
  UseHeadMediaContentOutput,
  UseHeadMediaContentState,
} from "./types";

export function useHeadMediaContent({
  id,
  interval = 1000 * 5,
}: UseHeadMediaContentInput): UseHeadMediaContentOutput {
  const [state, setState] = useState<UseHeadMediaContentState>({
    loading: true,
  });

  const refresh = useCallback(async () => {
    const { error, etag, length, modified, type } = await headMediaContent({
      id: id,
    });
    if (error) setState({ error: error, loading: false });
    else
      setState({
        etag: etag,
        length: length,
        loading: false,
        modified: modified,
        type: type,
      });
  }, [id]);

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
