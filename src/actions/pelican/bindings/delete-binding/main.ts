"use server";

import { auth } from "../../../../auth";
import {
  BindingNotFoundError,
  deleteBinding as internalDeleteBinding,
} from "../../../../lib/pelican/bindings/delete-binding";
import { PelicanError } from "../../../../lib/pelican/errors";
import { errors } from "./constants";
import { inputSchema } from "./schemas";
import { DeleteBindingInput, DeleteBindingOutput } from "./types";

export async function deleteBinding(
  input: DeleteBindingInput,
): Promise<DeleteBindingOutput> {
  const session = await auth.auth();
  if (!session) return { error: errors.unauthorized };

  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) return { error: errors.invalidInput };

  try {
    await internalDeleteBinding({ id: parsed.data.id });
    return {};
  } catch (error) {
    if (error instanceof BindingNotFoundError)
      return { error: errors.notFound };
    if (error instanceof PelicanError) return { error: errors.generic };
    throw error;
  }
}
