import { trimEnd } from "es-toolkit/string";

import type {
  GetOriginalBaseUrlInput,
  GetOriginalBaseUrlOutput,
} from "./types";

import { getOriginalRequestUrl } from "../get-original-request-url";
import { getRequestUrl } from "../get-request-url";

export async function getOriginalBaseUrl({
  request,
}: GetOriginalBaseUrlInput = {}): Promise<GetOriginalBaseUrlOutput> {
  const { requestUrl } = await getRequestUrl({ request: request });
  const { originalRequestUrl } = await getOriginalRequestUrl({
    request: request,
  });

  const path = trimEnd(new URL(requestUrl).pathname, "/");
  const originalPath = trimEnd(new URL(originalRequestUrl).pathname, "/");

  const url = new URL(originalRequestUrl);
  url.search = "";
  url.hash = "";
  url.pathname = originalPath.endsWith(path)
    ? originalPath.slice(0, originalPath.length - path.length) + "/"
    : "/";

  const originalBaseUrl = url.toString();

  return { originalBaseUrl: originalBaseUrl };
}
