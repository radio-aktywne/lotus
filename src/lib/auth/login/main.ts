import { AuthError } from "next-auth";
import "server-only";

import { auth } from "../../../auth";
import { LogInInput, LogInOutput } from "./types";
import { createAuthorizationParameters } from "./utils";

export async function logIn({
  callback,
  prompt,
}: LogInInput = {}): Promise<LogInOutput> {
  const parameters = await createAuthorizationParameters(prompt);

  try {
    const url = (await auth.signIn(
      "scorpion",
      { redirect: false, redirectTo: callback },
      parameters,
    )) as string;

    return { url: url };
  } catch (error) {
    if (error instanceof AuthError) return { error: error.type };
    throw error;
  }
}
