import type { NextRequest } from "next/server";

import { STATUS_CODES } from "http";
import { connection } from "next/server";

import type { RouteInput } from "../../../types";
import type { Keys } from "./types";

import { state } from "../../../../server/state/vars/state";
import { Schemas } from "./schemas";

export async function GET(
  request: NextRequest,
  { params }: RouteInput<Keys.Path>,
) {
  await connection();

  const pathParameters = await Schemas.Path.parseAsync(await params);

  const { response: mediaIdContentDownloadResponse } =
    await state.current.apis.pelican.mediaIdContentDownload({
      path: { id: pathParameters.id },
    });

  if (mediaIdContentDownloadResponse.status === 404)
    return new Response(STATUS_CODES[404], { status: 404 });

  return new Response(mediaIdContentDownloadResponse.body, {
    headers: {
      "Content-Length":
        mediaIdContentDownloadResponse.headers.get("Content-Length")!,
      "Content-Type":
        mediaIdContentDownloadResponse.headers.get("Content-Type")!,
      ETag: mediaIdContentDownloadResponse.headers.get("ETag")!,
      "Last-Modified":
        mediaIdContentDownloadResponse.headers.get("Last-Modified")!,
    },
    status: 200,
  });
}

export async function PUT(
  request: NextRequest,
  { params }: RouteInput<Keys.Path>,
) {
  await connection();

  const pathParameters = await Schemas.Path.parseAsync(await params);

  const contentType = request.headers.get("Content-Type");

  if (!request.body || !contentType)
    return new Response(STATUS_CODES[400], { status: 400 });

  const { response: mediaIdContentUploadResponse } =
    await state.current.apis.pelican.mediaIdContentUpload({
      body: request.body,
      headers: { "Content-Type": contentType },
      path: { id: pathParameters.id },
    });

  if (mediaIdContentUploadResponse.status === 404)
    return new Response(STATUS_CODES[404], { status: 404 });

  return new Response(null, { status: 204 });
}
