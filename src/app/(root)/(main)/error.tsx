"use client";

import { msg } from "@lingui/core/macro";

import type { ErrorInput, ErrorMetadataUtilityInput } from "../../types";

import { Metadata } from "../../../isomorphic/metadata/components/metadata";
import { MainErrorView } from "./error.view";

function getTitle({}: ErrorMetadataUtilityInput = {}) {
  return msg({ message: "Error • lotus" });
}

export default function MainError({ reset }: ErrorInput) {
  return (
    <>
      <Metadata title={getTitle()} />
      <MainErrorView reset={reset} />
    </>
  );
}
