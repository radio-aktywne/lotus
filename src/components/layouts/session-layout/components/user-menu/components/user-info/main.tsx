import { MenuLabel } from "@mantine/core";

import { UserInfoInput } from "./types";

export function UserInfo({ session }: UserInfoInput) {
  return <MenuLabel>{session.custom.user.subject}</MenuLabel>;
}
