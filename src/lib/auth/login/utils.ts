import { getToken } from "../get-token";
import { LogInInput } from "./types";

export async function createAuthorizationParameters(
  prompt: LogInInput["prompt"],
) {
  const params = new URLSearchParams();

  const { token } = await getToken();

  if (token) {
    params.append("id_token_hint", token.custom.tokens.id.token);
  }

  switch (prompt) {
    case "account":
      params.append("prompt", "select_account");
      break;
    case "consent":
      params.append("prompt", "consent");
      break;
    case "login":
      params.append("prompt", "login");
      break;
    case "none":
      params.append("prompt", "none");
      break;
  }

  return params;
}
