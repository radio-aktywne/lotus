"use client";

import { Loader } from "@mantine/core";

import { useSession } from "../../../hooks/use-session";
import { UserMenu } from "./components/user-menu";
import { SessionLayoutInput } from "./types";

export function SessionLayout({ children }: SessionLayoutInput) {
  const { loading, session } = useSession();

  if (loading) return <Loader />;

  return (
    <>
      <UserMenu session={session} />
      {children}
    </>
  );
}
