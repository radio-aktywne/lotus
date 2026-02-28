import { connection } from "next/server";

import type { LoadingInput } from "../../types";

import { MainLoadingView } from "./loading.view";

export default async function MainLoading({}: LoadingInput) {
  await connection();

  return <MainLoadingView />;
}
