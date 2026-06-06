import { forbidden } from "next/navigation";

import type { UseAuthenticatedInput, UseAuthenticatedOutput } from "./types";

import { isAuthenticated } from "../../../../common/access/lib/is-authenticated";

export function useAuthenticated({
  user,
}: UseAuthenticatedInput): UseAuthenticatedOutput {
  if (!isAuthenticated(user)) forbidden();

  return { user: user };
}
