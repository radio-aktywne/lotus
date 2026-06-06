import type { GetUserInput, GetUserOutput } from "./types";

import { Schemas } from "./schemas";

export async function getUser({
  headers,
}: GetUserInput): Promise<GetUserOutput> {
  const [id, traits] = await Promise.all([
    Schemas.Id.safeParseAsync(headers.get("X-User-ID")),
    Schemas.Traits.safeParseAsync(headers.get("X-User-Traits")),
  ]);

  const user =
    id.success && traits.success ? { id: id.data, traits: traits.data } : null;

  return { user: user };
}
