"use client";

import { MainLayout } from "@radio-aktywne/ui";

import { RootErrorMetadata } from "../components/metadata/root/root-error-metadata";
import { RootErrorView } from "../components/views/root/root-error-view";
import { RootErrorInput } from "./types";

export const dynamic = "force-dynamic";

export default function RootError({ reset }: RootErrorInput) {
  return (
    <MainLayout>
      <RootErrorMetadata />
      <RootErrorView onRetry={reset} />
    </MainLayout>
  );
}
