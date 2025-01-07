import { getToken } from "../../../lib/auth/get-token";
import { scorpionCredentials } from "../../../services/scorpion";

export async function createLogoutParams() {
  const params = new URLSearchParams({
    client_id: scorpionCredentials.client,
    post_logout_redirect_uri:
      process.env.LOTUS__URLS__PUBLIC || "http://localhost:10230",
  });

  const { token } = await getToken();

  if (token) {
    params.append("id_token_hint", token.custom.tokens.id.token);
  }

  return params;
}
