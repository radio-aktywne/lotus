import { MainLayout } from "@radio-aktywne/ui";

import { AuthLayoutInput } from "./types";

export default function AuthLayout({ children }: AuthLayoutInput) {
  return <MainLayout>{children}</MainLayout>;
}
