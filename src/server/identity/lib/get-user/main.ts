import type { GetUserInput, GetUserOutput } from "./types";

import { parseUserFromHeaders } from "./utils";

export async function getUser({
  headers,
}: GetUserInput): Promise<GetUserOutput> {
  const result = await parseUserFromHeaders(headers);

  const user = result.success ? result.data : null;

  return { user: user };
}
