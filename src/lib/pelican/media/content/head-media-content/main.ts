import "server-only";

import { pelican } from "../../../../../services/pelican";
import { PelicanError } from "../../../errors";
import { MediaNotFoundError } from "./errors";
import { HeadMediaContentInput, HeadMediaContentOutput } from "./types";

export async function headMediaContent({
  id,
}: HeadMediaContentInput): Promise<HeadMediaContentOutput> {
  const { error, response } = await pelican.HEAD("/media/{id}/content", {
    cache: "no-store",
    params: {
      path: { id: id },
    },
    parseAs: "stream",
  });

  if (error || !response.ok) {
    if (response.status === 404) throw new MediaNotFoundError();
    throw new PelicanError();
  }

  const etag = response.headers.get("etag")!;
  const length = Number(response.headers.get("content-length")!);
  const modified = response.headers.get("last-modified")!;
  const type = response.headers.get("content-type")!;

  return {
    etag: etag,
    length: length,
    modified: modified,
    type: type,
  };
}
