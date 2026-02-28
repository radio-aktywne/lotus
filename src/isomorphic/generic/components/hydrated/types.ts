import type { PropsWithChildren, ReactNode } from "react";

export type HydratedInput = PropsWithChildren<{
  fallback?: ReactNode;
}>;
