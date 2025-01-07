import "server-only";

import { auth } from "../../../auth";
import { GetSessionInput, GetSessionOutput } from "./types";

export async function getSession({}: GetSessionInput = {}): Promise<GetSessionOutput> {
  const session = await auth.auth();

  return { session: session };
}
