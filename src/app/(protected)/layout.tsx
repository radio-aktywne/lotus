import { MainLayout } from "@radio-aktywne/ui";

import { SessionLayout } from "../../components/layouts/session-layout";
import { getSession } from "../../lib/auth/get-session";
import { SessionProvider } from "../../providers/session-provider";
import { ProtectedLayoutInput } from "./types";

export const dynamic = "force-dynamic";

export default async function ProtectedLayout({
  children,
}: ProtectedLayoutInput) {
  const { session } = await getSession();

  return (
    <SessionProvider session={session}>
      <SessionLayout>
        <MainLayout>{children}</MainLayout>
      </SessionLayout>
    </SessionProvider>
  );
}
