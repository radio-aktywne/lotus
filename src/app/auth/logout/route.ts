import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

import { scorpionConfig } from "../../../services/scorpion";
import { createLogoutParams } from "./utils";

export async function GET(): Promise<NextResponse> {
  const params = await createLogoutParams();

  const url = new URL("/oauth2/sessions/logout", scorpionConfig.baseUrl);
  url.search = params.toString();

  redirect(url.toString());
}
