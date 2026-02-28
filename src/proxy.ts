import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

import { serverGenericConstants } from "./server/generic/constants";
import { getRequestUrl } from "./server/generic/lib/get-request-url";

export async function proxy(request: NextRequest) {
  const { requestUrl } = await getRequestUrl({ request: request });

  const headers = new Headers({
    ...Object.fromEntries(request.headers),
    [serverGenericConstants.headers.requestUrl]: requestUrl,
  });

  return NextResponse.next({ request: { headers: headers } });
}
