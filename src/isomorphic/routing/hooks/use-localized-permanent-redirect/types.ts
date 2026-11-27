import type { permanentRedirect } from "next/navigation";

export type LocalizedPermanentRedirectType = Parameters<
  typeof permanentRedirect
>[1];

export type LocalizedPermanentRedirectOptions = {
  href: string;
  type?: LocalizedPermanentRedirectType;
};

export type LocalizedPermanentRedirect = (
  options: LocalizedPermanentRedirectOptions,
) => never;

export type UseLocalizedPermanentRedirectInput = object;

export type UseLocalizedPermanentRedirectOutput = {
  permanentRedirect: LocalizedPermanentRedirect;
};
