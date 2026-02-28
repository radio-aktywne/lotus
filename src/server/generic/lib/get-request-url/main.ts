import { headers } from "next/headers";

import type { GetRequestUrlInput, GetRequestUrlOutput } from "./types";

import { serverGenericConstants } from "../../constants";

export async function getRequestUrl({
  request,
}: GetRequestUrlInput = {}): Promise<GetRequestUrlOutput> {
  if (request === undefined)
    return {
      requestUrl: (await headers()).get(
        serverGenericConstants.headers.requestUrl,
      )!,
    };

  const requestUrl = request.url;

  return { requestUrl: requestUrl };
}
