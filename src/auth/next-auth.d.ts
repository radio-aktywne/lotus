import "next-auth";
import "next-auth/jwt";

import { CustomSessionData, CustomTokenData, CustomUserData } from "./types";

declare module "next-auth" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  export interface Profile {
    iss: string;
    sid: string;
    sub: string;
  }

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
