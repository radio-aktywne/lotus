import type { useRouter } from "next/navigation";

export type LocalizedRouter = ReturnType<typeof useRouter>;

export type UseLocalizedRouterInput = object;

export type UseLocalizedRouterOutput = {
  router: LocalizedRouter;
};
