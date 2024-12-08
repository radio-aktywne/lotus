"use client";

import { RootErrorMetadata } from "../components/metadata/root/root-error-metadata";
import { RootErrorView } from "../components/views/root/root-error-view";
import { RootErrorInput } from "./types";

export default function RootError({ reset }: RootErrorInput) {
  return (
    <>
      <RootErrorMetadata />
      <RootErrorView onRetry={reset} />
    </>
  );
}
