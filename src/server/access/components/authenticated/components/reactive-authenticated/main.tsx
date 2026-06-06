"use client";

import type { ReactiveAuthenticatedInput } from "./types";

import { useAuthenticated } from "../../../../../../isomorphic/access/hooks/use-authenticated";
import { useIdentity } from "../../../../../../isomorphic/identity/hooks/use-identity";

export function ReactiveAuthenticated({
  children,
}: ReactiveAuthenticatedInput) {
  const { identity } = useIdentity();
  useAuthenticated({ user: identity.user });

  return children;
}
