import { connection } from "next/server";

import type { LayoutInput } from "../../types";
import type { Keys } from "./types";

import { MainLayoutView } from "./layout.view";

export default async function MainLayout({
  children,
}: LayoutInput<Keys.Path, Keys.Slots>) {
  await connection();

  return <MainLayoutView>{children}</MainLayoutView>;
}
