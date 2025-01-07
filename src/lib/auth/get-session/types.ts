import { Session } from "next-auth";

export type GetSessionInput = {
  [key: string]: never;
};

export type GetSessionOutput = {
  session: null | Session;
};
