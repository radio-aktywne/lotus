"use client";

import Link from "next/link";

import type { ClientLinkInput } from "./types";

export function ClientLink({ ...input }: ClientLinkInput) {
  return <Link {...input} />;
}
