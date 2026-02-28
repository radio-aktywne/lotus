import type { PageViewInput } from "../../../../../../types";
import type { Schemas } from "./schemas";

import { NewPlaylistWidget } from "../../../../../../../client/core/components/new-playlist-widget";
import { LoadingWidget } from "../../../../../../../common/core/components/generic/loading-widget";
import { Hydrated } from "../../../../../../../isomorphic/generic/components/hydrated";

export async function PlaylistsNewPageView({}: PageViewInput<
  typeof Schemas.Path,
  typeof Schemas.Query
>) {
  return (
    <Hydrated fallback={<LoadingWidget />}>
      <NewPlaylistWidget />
    </Hydrated>
  );
}
