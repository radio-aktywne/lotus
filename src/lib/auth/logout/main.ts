import { AuthError } from "next-auth";
import "server-only";

import { auth } from "../../../auth";
import { LogOutInput, LogOutOutput } from "./types";

export async function logOut({
  callback,
}: LogOutInput = {}): Promise<LogOutOutput> {
  try {
    const url = (await auth.signOut({
      redirect: false,
      redirectTo: callback,
    })) as string;

    return { url: url };
  } catch (error) {
    if (error instanceof AuthError) return { error: error.type };
    throw error;
  }
}
