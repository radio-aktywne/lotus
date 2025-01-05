import { GetLogoutPathInput, GetLogoutPathOutput } from "./types";

export function getLogoutPath({}: GetLogoutPathInput = {}): GetLogoutPathOutput {
  const params = new URLSearchParams();

  const base = "/auth/logout";
  const query = params.toString();
  const path = query ? `${base}?${query}` : base;

  return { path: path };
}
