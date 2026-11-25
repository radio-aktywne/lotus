"use client";

import { msg } from "@lingui/core/macro";
import { UserMenu } from "@radio-aktywne/ui";
import { MdLogout } from "react-icons/md";

import type { IdentityWidgetInput } from "./types";

import { useLocalization } from "../../../localization/hooks/use-localization";
import { useIdentity } from "../../hooks/use-identity";

export function IdentityWidget({}: IdentityWidgetInput) {
  const { identity } = useIdentity();
  const { localization } = useLocalization();

  if (identity.user === null) return null;

  return (
    <UserMenu
      items={[
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
