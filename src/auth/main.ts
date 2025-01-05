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
      options: {
        domain: process.env.LOTUS__COOKIES__DOMAIN || undefined,
      },
    },
    csrfToken: {
      name: cookies.csrfToken,
      options: {
        domain: process.env.LOTUS__COOKIES__DOMAIN || undefined,
      },
    },
    nonce: {
      name: cookies.nonce,
      options: {
        domain: process.env.LOTUS__COOKIES__DOMAIN || undefined,
      },
    },
    pkceCodeVerifier: {
      name: cookies.pkceCodeVerifier,
      options: {
        domain: process.env.LOTUS__COOKIES__DOMAIN || undefined,
      },
    },
    sessionToken: {
      name: cookies.sessionToken,
      options: {
        domain: process.env.LOTUS__COOKIES__DOMAIN || undefined,
      },
    },
    state: {
      name: cookies.state,
      options: {
        domain: process.env.LOTUS__COOKIES__DOMAIN || undefined,
      },
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
