import type { redirect } from "next/navigation";

export type LocalizedRedirectType = Parameters<typeof redirect>[1];

export type LocalizedRedirectInput = {
  href: string;
  type?: LocalizedRedirectType;
};
