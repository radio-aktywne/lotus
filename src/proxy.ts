import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

import { localizePath } from "./common/routing/lib/localize-path";
import { resolvePath } from "./common/routing/lib/resolve-path";
import { serverGenericConstants } from "./server/generic/constants";
import { getRequestUrl } from "./server/generic/lib/get-request-url";
import { resolveLocale } from "./server/localization/lib/resolve-locale";
import { getLocalizedRoutes } from "./server/routing/lib/get-localized-routes";

export async function proxy(request: NextRequest) {
  const { requestUrl } = await getRequestUrl({ request: request });

  const headers = new Headers({
    ...Object.fromEntries(request.headers),
    [serverGenericConstants.headers.requestUrl]: requestUrl,
  });

  const { locale } = await resolveLocale();
  const { localizedRoutes } = getLocalizedRoutes();
  const { pathname, search } = request.nextUrl;

  const { path: resolvedPath } = resolvePath({
    locale: locale,
    localizedRoutes: localizedRoutes,
    path: pathname,
  });

  if (resolvedPath !== null) {
    const { path: localizedPath } = localizePath({
      localeRoutes: localizedRoutes[locale],
      path: resolvedPath,
    });

    if (localizedPath === pathname)
      return NextResponse.rewrite(
        new URL(`${resolvedPath}${search}`, request.url),
        { request: { headers: headers } },
      );

    return NextResponse.redirect(
      new URL(`${localizedPath}${search}`, request.url),
    );
  }

  return NextResponse.next({ request: { headers: headers } });
}
