import { forbidden } from "next/navigation";

import type { AuthenticatedInput } from "./types";

import { isAuthenticated } from "../../../../common/access/lib/is-authenticated";
import { getIdentity } from "../../../identity/lib/get-identity";
import { ReactiveAuthenticated } from "./components/reactive-authenticated";

export async function Authenticated({ children }: AuthenticatedInput) {
  const { identity } = await getIdentity();

  if (!isAuthenticated(identity.user)) forbidden();

  return <ReactiveAuthenticated>{children}</ReactiveAuthenticated>;
}
