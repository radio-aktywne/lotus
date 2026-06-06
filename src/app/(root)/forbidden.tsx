import { msg } from "@lingui/core/macro";
import { connection } from "next/server";

import type { ForbiddenInput, ForbiddenMetadataUtilityInput } from "../types";

import { Metadata } from "../../isomorphic/metadata/components/metadata";
import { RootForbiddenView } from "./forbidden.view";

async function getTitle({}: ForbiddenMetadataUtilityInput = {}) {
  return msg({ message: "Forbidden • lotus" });
}

export default async function RootForbidden({}: ForbiddenInput) {
  await connection();

  return (
    <>
      <Metadata title={await getTitle()} />
      <RootForbiddenView />
    </>
  );
}
