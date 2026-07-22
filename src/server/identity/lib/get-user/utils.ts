import { unflatten } from "flat";

import { IdentitySchemas } from "../../../../common/identity/schemas";

export function parseValue(value: string) {
  try {
    return JSON.parse(value) as unknown;
  } catch {
    return value;
  }
}

export async function parseUserFromHeaders(headers: Headers) {
  const delimiter = ".";

  const flat = Object.fromEntries(
    headers
      .entries()
      .map(([key, value]) => [key.toLowerCase(), value] as [string, string])
      .filter(([key, value]) => /^x-user(?:-[^-]+)*$/.exec(key) && value)
      .map(([key, value]) => [
        key.replace(/^x-/, "").replaceAll("-", "."),
        parseValue(value),
      ]),
  );

  const raw = unflatten(flat, { delimiter: delimiter });
  const user = (raw as { user?: unknown }).user;
  return await IdentitySchemas.User.safeParseAsync(user);
}
