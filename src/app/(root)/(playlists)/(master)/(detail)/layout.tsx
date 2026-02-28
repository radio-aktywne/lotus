import { connection } from "next/server";

import type { LayoutInput } from "../../../../types";
import type { Keys } from "./types";

import { PlaylistsDetailLayoutView } from "./layout.view";

export default async function PlaylistsDetailLayout({
  children,
}: LayoutInput<Keys.Path, Keys.Slots>) {
  await connection();

  return <PlaylistsDetailLayoutView>{children}</PlaylistsDetailLayoutView>;
}
