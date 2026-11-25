"use client";

import { msg } from "@lingui/core/macro";
import { UserMenu } from "@radio-aktywne/ui";
import { trimEnd } from "es-toolkit/string";
import { usePathname, useSearchParams } from "next/navigation";
import { MdApps, MdLogout, MdManageAccounts } from "react-icons/md";

import type { IdentityWidgetInput } from "./types";

import { createUrl } from "../../../../common/generic/lib/create-url";
import { useLocalization } from "../../../localization/hooks/use-localization";
import { useIdentity } from "../../hooks/use-identity";

export function IdentityWidget({ urls }: IdentityWidgetInput) {
  const { identity } = useIdentity();
  const { localization } = useLocalization();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (identity.user === null) return null;

  const baseUrl = new URL(urls.base);

  const { url: appsUrl } = createUrl({
    host: urls.sunflower.host,
    path: urls.sunflower.path,
    port: urls.sunflower.port,
    scheme: urls.sunflower.scheme,
  });

  const { url: returnUrl } = createUrl({
    host: baseUrl.hostname,
    path: `${trimEnd(baseUrl.pathname, "/")}${pathname}`,
    port: baseUrl.port ? Number(baseUrl.port) : undefined,
    query: Object.fromEntries(searchParams),
    scheme: baseUrl.protocol.replace(":", ""),
  });

  const { url: accountUrl } = createUrl({
    host: urls.orchid.host,
    path: `${trimEnd(urls.orchid.path ?? "", "/")}/settings/init`,
    port: urls.orchid.port,
    query: { return_to: returnUrl },
    scheme: urls.orchid.scheme,
  });

  return (
    <UserMenu
      items={[
        {
          icon: MdApps,
          label: localization.localize(msg({ message: "Apps" })),
          url: appsUrl,
        },
        {
          icon: MdManageAccounts,
          label: localization.localize(msg({ message: "Account" })),
          url: accountUrl,
        },
        {
          color: "red",
          icon: MdLogout,
          label: localization.localize(msg({ message: "Logout" })),
          url: "/auth/logout",
        },
      ]}
      user={{ name: identity.user.traits.names.display }}
    />
  );
}
