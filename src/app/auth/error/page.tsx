import { i18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { Metadata } from "next";

import { AuthErrorPageMetadata } from "../../../components/metadata/auth/auth-error-page-metadata";
import { AuthErrorPageView } from "../../../components/views/auth/auth-error-page-view";
import { getLanguage } from "../../../lib/i18n/get-language";
import { loadLocale } from "../../../lib/i18n/load-locale";
import { AuthErrorPageInput } from "./types";
import { parseParams } from "./utils";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { language } = getLanguage();
  await loadLocale({ i18n, language });

  return {
    description: i18n._(msg({ message: "lotus" })),
    title: i18n._(msg({ message: "Auth error • lotus" })),
  };
}

export default function AuthErrorPage({ searchParams }: AuthErrorPageInput) {
  const { data: params, error: paramsError } = parseParams(searchParams);

  if (paramsError) throw new Error("Invalid query parameters");

  const { error } = params;

  return (
    <>
      <AuthErrorPageMetadata />
      <AuthErrorPageView error={error} />
    </>
  );
}
