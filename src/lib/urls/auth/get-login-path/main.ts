import { GetLoginPathInput, GetLoginPathOutput } from "./types";

export function getLoginPath({
  callback,
}: GetLoginPathInput = {}): GetLoginPathOutput {
  const params = new URLSearchParams();
  if (callback) params.append("callbackUrl", callback);

  const base = "/auth/login";
  const query = params.toString();
  const path = query ? `${base}?${query}` : base;

  return { path: path };
}
