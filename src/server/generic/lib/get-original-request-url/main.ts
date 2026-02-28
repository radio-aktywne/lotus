import { trimEnd } from "es-toolkit/string";
import { headers } from "next/headers";

import type {
  GetOriginalRequestUrlInput,
  GetOriginalRequestUrlOutput,
} from "./types";

import { getRequestUrl } from "../get-request-url";

export async function getOriginalRequestUrl({
  request,
}: GetOriginalRequestUrlInput = {}): Promise<GetOriginalRequestUrlOutput> {
  const { requestUrl } = await getRequestUrl({ request: request });

  const h = await headers();
  const url = new URL(requestUrl);

  const proto =
    /proto="?([^";,\s]+)"?/i.exec(h.get("Forwarded") ?? "")?.[1]?.trim() ||
    h.get("X-Forwarded-Proto")?.split(",")[0]?.trim() ||
    url.protocol.replace(":", "");

  const host =
    /host="?([^";,\s]+)"?/i.exec(h.get("Forwarded") ?? "")?.[1]?.trim() ||
    h.get("X-Forwarded-Host")?.split(",")[0]?.trim() ||
    h.get("Host")?.trim() ||
    url.host;

  const prefix = h.get("X-Forwarded-Prefix")?.split(",")[0]?.trim() || "";

  url.protocol = proto;
  url.port = "";
  url.host = host;
  url.pathname = trimEnd(prefix, "/") + url.pathname;

  const originalRequestUrl = url.toString();

  return { originalRequestUrl: originalRequestUrl };
}
