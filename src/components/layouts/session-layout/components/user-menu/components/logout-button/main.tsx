"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { MenuItem } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";

import { getLogoutPath } from "../../../../../../../lib/urls/auth/get-logout-path";
import { LogoutButtonInput } from "./types";

export function LogoutButton({}: LogoutButtonInput) {
  const { _ } = useLingui();

  const { path: logoutPath } = getLogoutPath();

  return (
    <MenuItem
      color="red"
      component="a"
      href={logoutPath}
      leftSection={<IconLogout />}
    >
      {_(msg({ message: "Logout" }))}
    </MenuItem>
  );
}
