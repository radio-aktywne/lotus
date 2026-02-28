"use client";

import { msg } from "@lingui/core/macro";

import type { ErrorInput, ErrorMetadataUtilityInput } from "../../types";

import { Metadata } from "../../../isomorphic/metadata/components/metadata";
import { PlaylistsErrorView } from "./error.view";

function getTitle({}: ErrorMetadataUtilityInput = {}) {
  return msg({ message: "Error • lotus" });
}

export default function PlaylistsError({ reset }: ErrorInput) {
  return (
    <>
      <Metadata title={getTitle()} />
      <PlaylistsErrorView reset={reset} />
    </>
  );
}
