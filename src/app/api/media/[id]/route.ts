import type { NextRequest } from "next/server";

import { STATUS_CODES } from "http";
import { connection } from "next/server";

import type { RouteInput } from "../../../types";
import type { Keys } from "./types";

import { isAuthenticated } from "../../../../common/access/lib/is-authenticated";
import { getIdentity } from "../../../../server/identity/lib/get-identity";
import { state } from "../../../../server/state/vars/state";
import { Schemas } from "./schemas";

export async function GET(
  request: NextRequest,
  { params }: RouteInput<Keys.Path>,
) {
  await connection();

  const { identity } = await getIdentity();
  if (!isAuthenticated(identity.user))
    return new Response(STATUS_CODES[403], { status: 403 });

  const pathParameters = await Schemas.Path.parseAsync(await params);

  const {
    data: mediaIdContentDownloadData,
    response: mediaIdContentDownloadResponse,
  } = await state.current.apis.pelican.mediaIdContentDownload({
    path: { id: pathParameters.id },
  });

  if (mediaIdContentDownloadData === undefined) {
    if (mediaIdContentDownloadResponse.status === 400)
      return new Response(STATUS_CODES[400], { status: 400 });

    if (mediaIdContentDownloadResponse.status === 404)
      return new Response(STATUS_CODES[404], { status: 404 });

    return new Response(STATUS_CODES[500], { status: 500 });
  }

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

  const { identity } = await getIdentity();
  if (!isAuthenticated(identity.user))
    return new Response(STATUS_CODES[403], { status: 403 });

  const pathParameters = await Schemas.Path.parseAsync(await params);

  const contentType = request.headers.get("Content-Type");

  if (!request.body || !contentType)
    return new Response(STATUS_CODES[400], { status: 400 });

  const {
    data: mediaIdContentUploadData,
    response: mediaIdContentUploadResponse,
  } = await state.current.apis.pelican.mediaIdContentUpload({
    body: request.body,
    headers: { "Content-Type": contentType },
    path: { id: pathParameters.id },
  });

  if (mediaIdContentUploadData === undefined) {
    if (mediaIdContentUploadResponse.status === 400)
      return new Response(STATUS_CODES[400], { status: 400 });

    if (mediaIdContentUploadResponse.status === 404)
      return new Response(STATUS_CODES[404], { status: 404 });

    return new Response(STATUS_CODES[500], { status: 500 });
  }

  return new Response(null, { status: 204 });
}
