import "@tanstack/react-query";

import type { QueryKey } from "@tanstack/react-query";

type MutationMeta = {
  [key: string]: unknown;
  awaits?: boolean | QueryKey[];
  invalidates?: boolean | QueryKey[];
};

declare module "@tanstack/react-query" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Register {
    mutationMeta: MutationMeta;
  }
}
