import "server-only";

import { pelican } from "../../../../../services/pelican";
import { PelicanError } from "../../../errors";
import { MediaNotFoundError } from "./errors";
import { UploadMediaContentInput } from "./types";

export async function uploadMediaContent({
  data,
  id,
  type,
}: UploadMediaContentInput): Promise<void> {
  const { error, response } = await pelican.PUT("/media/{id}/content", {
    body: data as unknown as undefined,
    bodySerializer: (body) => body,
    duplex: "half",
    params: {
      header: { "Content-Type": type },
      path: { id: id },
    },
  });

  if (error || !response.ok) {
    if (response.status === 404) throw new MediaNotFoundError();
    throw new PelicanError();
  }
}
