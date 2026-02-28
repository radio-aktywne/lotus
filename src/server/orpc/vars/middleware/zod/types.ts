import type { ZodLocaleData } from "../../../../../common/localization/types";
import type { MiddlewareOutputContext } from "../../../types/middleware";

export type StorageData = {
  locale: ZodLocaleData;
};

export type ZodMiddlewareOutputContext = MiddlewareOutputContext<"zod">;
