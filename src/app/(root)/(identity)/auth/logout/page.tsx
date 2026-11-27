import { connection } from "next/server";

import type { PageInput } from "../../../../types";
import type { Keys } from "./types";

import { localizedRedirect } from "../../../../../server/routing/lib/localized-redirect";

export default async function AuthLogoutPage({}: PageInput<
  Keys.Path,
  Keys.Query
>) {
  await connection();

  return await localizedRedirect({ href: "/" });
}
