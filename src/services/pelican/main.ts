import createClient, { ClientOptions } from "openapi-fetch";
import "server-only";

import type { paths } from "./types";

const scheme = process.env.LOTUS__PELICAN__HTTP__SCHEME || "http";
const host = process.env.LOTUS__PELICAN__HTTP__HOST || "localhost";
const port = process.env.LOTUS__PELICAN__HTTP__PORT ?? 10200;
const path = (process.env.LOTUS__PELICAN__HTTP__PATH || "")
  // Ensure path starts with a slash
  .replace(/^(?!\/)(.*)$/, "/$1")
  // Remove trailing slashes
  .replace(/\/+$/, "");
const url = `${scheme}://${host}${port ? `:${port}` : ""}${path}`;

export const pelicanConfig = {
  baseUrl: url,
} satisfies ClientOptions;

export const pelican = createClient<paths>(pelicanConfig);
