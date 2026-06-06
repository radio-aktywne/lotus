import { useMemo } from "react";
import { useSnapshot } from "valtio";

import type { UseIdentityInput, UseIdentityOutput } from "./types";

import { useSafeContext } from "../../../generic/hooks/use-safe-context";
import { IdentityContext } from "../../contexts/identity";

export function useIdentity({}: UseIdentityInput = {}): UseIdentityOutput {
  const current = useSafeContext(IdentityContext);
  const snapshot = useSnapshot(current);

  const identity = useMemo(() => ({ user: snapshot.user }), [snapshot.user]);

  return useMemo(() => ({ identity }), [identity]);
}
