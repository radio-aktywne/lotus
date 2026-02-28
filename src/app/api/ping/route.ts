import type { NextRequest } from "next/server";

import { connection } from "next/server";

import type { RouteInput } from "../../types";
import type { Keys } from "./types";

async function handle(request: NextRequest, {}: RouteInput<Keys.Path>) {
  await connection();

  return new Response(null, { status: 204 });
}

export { handle as GET, handle as HEAD };
