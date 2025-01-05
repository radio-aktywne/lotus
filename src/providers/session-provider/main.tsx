import { SessionProvider as InternalSessionProvider } from "next-auth/react";

import { sessionFetchInterval } from "./constants";
import { SessionProviderInput } from "./types";
import { getDurationInSeconds } from "./utils";

export function SessionProvider({ children, session }: SessionProviderInput) {
  return (
    <InternalSessionProvider
      basePath="/api/auth"
      refetchInterval={getDurationInSeconds(sessionFetchInterval)}
      refetchOnWindowFocus={false}
      refetchWhenOffline={false}
      session={session}
    >
      {children}
    </InternalSessionProvider>
  );
}
