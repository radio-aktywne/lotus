import { auth } from "../../auth";
import { SessionLayout } from "../../components/layouts/session-layout";
import { SessionProvider } from "../../providers/session-provider";
import { ProtectedLayoutInput } from "./types";

export default async function ProtectedLayout({
  children,
}: ProtectedLayoutInput) {
  const session = await auth.auth();

  return (
    <SessionProvider session={session}>
      <SessionLayout>{children}</SessionLayout>
    </SessionProvider>
  );
}
