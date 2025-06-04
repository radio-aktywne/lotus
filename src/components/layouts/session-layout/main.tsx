"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Center, Loader } from "@mantine/core";
import { UserMenu } from "@radio-aktywne/ui";

import { useSession } from "../../../hooks/use-session";
import { getLogoutPath } from "../../../lib/urls/auth/get-logout-path";
import { SessionLayoutInput } from "./types";

export function SessionLayout({ children }: SessionLayoutInput) {
  const { loading, session } = useSession();
  const { _ } = useLingui();

  if (loading)
    return (
      <Center>
        <Loader />
      </Center>
    );

  const { path: logoutPath } = getLogoutPath();

  return (
    <>
      <UserMenu
        items={{
          logout: {
            label: _(msg({ message: "Logout" })),
            url: logoutPath,
          },
        }}
        user={{
          name: session.custom.user.traits.names.display,
        }}
      />
      {children}
    </>
  );
}
