import { connection } from "next/server";

import type { LayoutInput } from "../../../types";
import type { Keys } from "./types";

import { Authenticated } from "../../../../server/access/components/authenticated";
import { PlaylistsMasterLayoutView } from "./layout.view";

export default async function PlaylistsMasterLayout({
  children,
}: LayoutInput<Keys.Path, Keys.Slots>) {
  await connection();

  return (
    <Authenticated>
      <PlaylistsMasterLayoutView>{children}</PlaylistsMasterLayoutView>
    </Authenticated>
  );
}
