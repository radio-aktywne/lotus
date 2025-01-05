import { SessionProviderProps } from "next-auth/react";

export type SessionProviderInput = Pick<
  SessionProviderProps,
  "children" | "session"
>;
