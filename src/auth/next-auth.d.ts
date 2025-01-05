import "next-auth";
import "next-auth/jwt";

import {
  CustomSessionData,
  CustomTokenData,
  CustomUserData,
  ProfileData,
} from "./types";

declare module "next-auth" {
  export type Profile = ProfileData;

  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  export interface Session {
    custom: CustomSessionData;
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  export interface User {
    custom: CustomUserData;
  }
}

declare module "next-auth/jwt" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  export interface JWT {
    custom: CustomTokenData;
  }
}
