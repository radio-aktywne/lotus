import { Session } from "next-auth";

export type UseSessionInput = {
  [key: string]: never;
};

export type UseSessionLoadingOutput = {
  loading: true;
  session?: never;
};

export type UseSessionLoadedOutput = {
  loading: false;
  session: Session;
};

export type UseSessionOutput = UseSessionLoadedOutput | UseSessionLoadingOutput;
