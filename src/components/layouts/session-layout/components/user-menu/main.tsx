import { Affix, Menu, MenuDropdown, MenuTarget } from "@mantine/core";

import { LogoutButton } from "./components/logout-button";
import { UserButton } from "./components/user-button";
import { UserInfo } from "./components/user-info";
import { UserMenuInput } from "./types";

export function UserMenu({ session }: UserMenuInput) {
  return (
    <Affix position={{ right: "1rem", top: "1rem" }}>
      <Menu position="bottom-end" shadow="md">
        <MenuTarget>
          <UserButton />
        </MenuTarget>
        <MenuDropdown>
          <UserInfo session={session} />
          <LogoutButton />
        </MenuDropdown>
      </Menu>
    </Affix>
  );
}
