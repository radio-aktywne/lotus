"use server";

import { getSession } from "../../../../lib/auth/get-session";
import { listBindings as internalListBindings } from "../../../../lib/pelican/bindings/list-bindings";
import { PelicanError } from "../../../../lib/pelican/errors";
import { errors } from "./constants";
import { inputSchema } from "./schemas";
import { ListBindingsInput, ListBindingsOutput } from "./types";

export async function listBindings(
  input: ListBindingsInput,
): Promise<ListBindingsOutput> {
  const { session } = await getSession();
  if (!session) return { error: errors.unauthorized };

  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) return { error: errors.invalidInput };

  try {
    const { bindings } = await internalListBindings({
      include: parsed.data.include,
      limit: parsed.data.limit,
      offset: parsed.data.offset,
      order: parsed.data.order,
      where: parsed.data.where,
    });
    return { data: bindings };
  } catch (error) {
    if (error instanceof PelicanError) return { error: errors.generic };
    throw error;
  }
}
