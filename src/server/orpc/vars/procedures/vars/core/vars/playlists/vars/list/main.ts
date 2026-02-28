import { mapValues } from "es-toolkit/object";
import { isJSONValue } from "es-toolkit/predicate";

import { state } from "../../../../../../../../../state/vars/state";
import { orpcServerRootBase } from "../../../../../../../bases/root";

export const list = orpcServerRootBase.core.playlists.list.handler(
  async ({ errors, input }) => {
    const { data: playlistsListData } =
      await state.current.apis.pelican.playlistsList({
        query: mapValues(input ?? {}, (value) =>
          isJSONValue(value) ? JSON.stringify(value) : value,
        ),
      });

    if (playlistsListData === undefined) throw errors.INTERNAL_SERVER_ERROR();

    return playlistsListData;
  },
);
