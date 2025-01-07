"use server";

import { getSession } from "../../../../lib/auth/get-session";
import {
  BindingNotFoundError,
  getBinding as internalGetBinding,
} from "../../../../lib/pelican/bindings/get-binding";
import { PelicanError } from "../../../../lib/pelican/errors";
import { errors } from "./constants";
import { inputSchema } from "./schemas";
import { GetBindingInput, GetBindingOutput } from "./types";

export async function getBinding(
  input: GetBindingInput,
): Promise<GetBindingOutput> {
  const { session } = await getSession();
  if (!session) return { error: errors.unauthorized };

  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) return { error: errors.invalidInput };

  try {
    const { binding } = await internalGetBinding({
      id: parsed.data.id,
      include: parsed.data.include,
    });
    return { data: binding };
  } catch (error) {
    if (error instanceof BindingNotFoundError)
      return { error: errors.notFound };
    if (error instanceof PelicanError) return { error: errors.generic };
    throw error;
  }
}
