"use client";

import { msg } from "@lingui/core/macro";

import type { ErrorInput, ErrorMetadataUtilityInput } from "../../../../types";

import { Metadata } from "../../../../../isomorphic/metadata/components/metadata";
import { PlaylistsDetailErrorView } from "./error.view";

function getTitle({}: ErrorMetadataUtilityInput = {}) {
  return msg({ message: "Error • lotus" });
}

export default function PlaylistsDetailError({ reset }: ErrorInput) {
  return (
    <>
      <Metadata title={getTitle()} />
      <PlaylistsDetailErrorView reset={reset} />
    </>
  );
}
