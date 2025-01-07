import { SessionLayout } from "../../components/layouts/session-layout";
import { getSession } from "../../lib/auth/get-session";
import { SessionProvider } from "../../providers/session-provider";
import { ProtectedLayoutInput } from "./types";

export default async function ProtectedLayout({
  children,
}: ProtectedLayoutInput) {
  const { session } = await getSession();

  return (
    <SessionProvider session={session}>
      <SessionLayout>{children}</SessionLayout>
    </SessionProvider>
  );
}
