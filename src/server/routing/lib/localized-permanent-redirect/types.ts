import type { permanentRedirect } from "next/navigation";

export type LocalizedPermanentRedirectType = Parameters<
  typeof permanentRedirect
>[1];

export type LocalizedPermanentRedirectInput = {
  href: string;
  type?: LocalizedPermanentRedirectType;
};
