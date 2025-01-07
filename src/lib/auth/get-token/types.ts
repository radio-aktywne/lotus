import { JWT } from "next-auth/jwt";

export type GetTokenInput = {
  [key: string]: never;
};

export type GetTokenOutput = {
  token: JWT | null;
};
