"use client";

import { msg } from "@lingui/core/macro";

import type { ErrorInput, ErrorMetadataUtilityInput } from "../types";

import { Metadata } from "../../isomorphic/metadata/components/metadata";
import { RootErrorView } from "./error.view";

function getTitle({}: ErrorMetadataUtilityInput = {}) {
  return msg({ message: "Error • lotus" });
}

export default function RootError({ reset }: ErrorInput) {
  return (
    <>
      <Metadata title={getTitle()} />
      <RootErrorView reset={reset} />
    </>
  );
}
