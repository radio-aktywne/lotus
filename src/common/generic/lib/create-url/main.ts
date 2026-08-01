import { isEmpty } from "es-toolkit/compat";
import { trimStart } from "es-toolkit/string";

import type { CreateUrlInput, CreateUrlOutput } from "./types";

export function createUrl({
  fragment,
  host,
  path,
  port,
  query,
  scheme,
}: CreateUrlInput): CreateUrlOutput {
  const basePart =
    scheme && host ? `${scheme}://${host}${port ? `:${port}` : ""}` : "";

  const pathPart = path ? `/${trimStart(path, "/")}` : "";

  const queryPart =
    query && !isEmpty(query)
      ? `?${new URLSearchParams(
          Object.entries(query).flatMap(([key, value]) =>
            Array.isArray(value)
              ? value.map((v) => [key, String(v)])
              : [[key, String(value)]],
          ),
        ).toString()}`
      : "";

  const fragmentPart = fragment ? `#${fragment}` : "";

  const url = basePart + pathPart + queryPart + fragmentPart;

  return { url: url };
}
