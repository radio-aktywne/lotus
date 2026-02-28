import { isEmpty } from "es-toolkit/compat";
import { mapValues } from "es-toolkit/object";
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
      ? `?${new URLSearchParams(mapValues(query, (value) => String(value))).toString()}`
      : "";
  const fragmentPart = fragment ? `#${fragment}` : "";

  const url = basePart + pathPart + queryPart + fragmentPart;

  return { url: url };
}
