import { connection } from "next/server";

import type { LoadingInput } from "../../../../types";

import { PlaylistsDetailLoadingView } from "./loading.view";

export default async function PlaylistsDetailLoading({}: LoadingInput) {
  await connection();

  return <PlaylistsDetailLoadingView />;
}
