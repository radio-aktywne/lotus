import { notFound } from "next/navigation";
import { connection } from "next/server";

import type { PageInput } from "../../../types";
import type { Keys } from "./types";

export default async function WildcardPage({}: PageInput<
  Keys.Path,
  Keys.Query
>) {
  await connection();

  notFound();
}
