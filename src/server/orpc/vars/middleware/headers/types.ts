import type { MiddlewareOutputContext } from "../../../types/middleware";

export type HeadersMiddlewareOutputContext = MiddlewareOutputContext<
  "headers",
  {
    headers: Headers;
  }
>;
