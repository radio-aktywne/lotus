import NextAuth, { NextAuthConfig, Profile } from "next-auth";
import { OIDCConfig } from "next-auth/providers";

import { scorpionConfig, scorpionCredentials } from "../services/scorpion";
import { cookies, sessionAge } from "./constants";
import { Auth } from "./types";
import {
  getDurationInSeconds,
  splitSecrets,
  transformProfile,
  transformSession,
  transformToken,
} from "./utils";

export const authConfig = {
  basePath: "/api/auth",
  callbacks: {
    jwt: transformToken,
    session: transformSession,
  },
  cookies: {
    callbackUrl: {
      name: cookies.callbackUrl,
    },
    csrfToken: {
      name: cookies.csrfToken,
    },
    nonce: {
      name: cookies.nonce,
    },
    pkceCodeVerifier: {
      name: cookies.pkceCodeVerifier,
    },
    sessionToken: {
      name: cookies.sessionToken,
    },
    state: {
      name: cookies.state,
    },
  },
  debug: (process.env.LOTUS__DEBUG || "true") === "true",
  pages: {
    error: "/auth/error",
    newUser: "/auth",
    signIn: "/auth/login",
    signOut: "/auth/logout",
    verifyRequest: "/auth",
  },
  providers: [
    {
      authorization: {
        params: {
          scope: "openid profile email offline_access",
        },
      },
      checks: ["nonce", "pkce", "state"],
      clientId: scorpionCredentials.client,
      clientSecret: scorpionCredentials.secret,
      id: "scorpion",
      issuer: scorpionConfig.baseUrl,
      name: "scorpion",
      profile: transformProfile,
      type: "oidc",
    } satisfies OIDCConfig<Profile>,
  ],
  secret: splitSecrets(process.env.LOTUS__SECRETS__AUTH || "secret"),
  session: {
    maxAge: getDurationInSeconds(sessionAge),
    strategy: "jwt",
  },
  trustHost: true,
} satisfies NextAuthConfig;

export const auth: Auth = NextAuth(authConfig);
