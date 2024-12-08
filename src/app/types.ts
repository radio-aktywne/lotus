import { PropsWithChildren } from "react";

export type RootErrorInput = {
  error: { digest?: string } & Error;
  reset: () => void;
};

export type RootLayoutInput = PropsWithChildren;

export type RootNotFoundInput = {
  [key: string]: never;
};

export type RootPageInput = {
  [key: string]: never;
};
