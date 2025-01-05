import "client-only";
import { useSession as internalUseSession } from "next-auth/react";
import { useMemo } from "react";

import { UseSessionInput, UseSessionOutput } from "./types";

export function useSession({}: UseSessionInput = {}): UseSessionOutput {
  const { data, status } = internalUseSession({ required: true });

  const loading = status === "loading";

  return useMemo(
    () =>
      loading ? { loading: loading } : { loading: loading, session: data },
    [loading, data],
  );
}
