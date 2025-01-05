import { NextRequest, NextResponse } from "next/server";

import { auth } from "../../../../auth";
import {
  downloadMediaContent,
  MediaNotFoundError as DownloadMediaNotFoundError,
} from "../../../../lib/pelican/media/content/download-media-content";
import {
  uploadMediaContent,
  MediaNotFoundError as UploadMediaNotFoundError,
} from "../../../../lib/pelican/media/content/upload-media-content";
import { errors } from "./constants";
import { RouteContext } from "./types";

export async function GET(
  request: NextRequest,
  context: RouteContext,
): Promise<NextResponse> {
  try {
    const session = await auth.auth();
    if (!session)
      return NextResponse.json(
        { error: errors.download.unauthorized },
        { status: 401, statusText: "Unauthorized" },
      );

    const { id } = context.params;

    const { data, etag, length, modified, type } = await downloadMediaContent({
      id: id,
    });

    const headers = {
      "Content-Length": length.toString(),
      "Content-Type": type,
      ETag: etag,
      "Last-Modified": modified,
    };

    return new NextResponse(data, {
      headers: headers,
      status: 200,
      statusText: "OK",
    });
  } catch (error) {
    if (error instanceof DownloadMediaNotFoundError) {
      return NextResponse.json(
        { error: errors.download.notFound },
        { status: 404, statusText: "Not Found" },
      );
    }

    return NextResponse.json(
      { error: errors.download.generic },
      { status: 500, statusText: "Internal Server Error" },
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: RouteContext,
): Promise<NextResponse> {
  try {
    const session = await auth.auth();
    if (!session)
      return NextResponse.json(
        { error: errors.upload.unauthorized },
        { status: 401, statusText: "Unauthorized" },
      );

    const { id } = context.params;

    const type = request.headers.get("Content-Type");

    if (!type)
      return NextResponse.json(
        { error: errors.upload.missingContentType },
        { status: 400, statusText: "Bad Request" },
      );

    await uploadMediaContent({
      data: request.body!,
      id: id,
      type: type,
    });

    return new NextResponse(null, { status: 204, statusText: "No Content" });
  } catch (error) {
    if (error instanceof UploadMediaNotFoundError) {
      return NextResponse.json(
        { error: errors.upload.notFound },
        { status: 404, statusText: "Not Found" },
      );
    }

    return NextResponse.json(
      { error: errors.upload.generic },
      { status: 500, statusText: "Internal Server Error" },
    );
  }
}
