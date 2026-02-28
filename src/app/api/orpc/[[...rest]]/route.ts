import type { NextRequest } from "next/server";

import { STATUS_CODES } from "http";
import { connection } from "next/server";

import type { RouteInput } from "../../../types";
import type { Keys } from "./types";

import { orpcServerHandler } from "../../../../server/orpc/vars/handler";

async function handle(request: NextRequest, {}: RouteInput<Keys.Path>) {
  await connection();

  const { response } = await orpcServerHandler.handle(request, {
    prefix: "/api/orpc",
  });

  return response ?? new Response(STATUS_CODES[404], { status: 404 });
}

export {
  handle as DELETE,
  handle as GET,
  handle as HEAD,
  handle as PATCH,
  handle as POST,
  handle as PUT,
};
