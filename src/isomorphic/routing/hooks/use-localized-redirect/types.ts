import type { redirect } from "next/navigation";

export type LocalizedRedirectType = Parameters<typeof redirect>[1];

export type LocalizedRedirectOptions = {
  href: string;
  type?: LocalizedRedirectType;
};

export type LocalizedRedirect = (options: LocalizedRedirectOptions) => never;

export type UseLocalizedRedirectInput = object;

export type UseLocalizedRedirectOutput = {
  redirect: LocalizedRedirect;
};
