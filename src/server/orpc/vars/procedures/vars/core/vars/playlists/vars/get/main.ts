import { mapValues } from "es-toolkit/object";
import { isJSONValue } from "es-toolkit/predicate";

import { state } from "../../../../../../../../../state/vars/state";
import { orpcServerRootBase } from "../../../../../../../bases/root";

export const get = orpcServerRootBase.core.playlists.get.handler(
  async ({ errors, input }) => {
    const { id, ...query } = input;

    const { data: playlistsIdGetData, response: playlistsIdGetResponse } =
      await state.current.apis.pelican.playlistsIdGet({
        path: { id: id },
        query: mapValues(query, (value) =>
          isJSONValue(value) ? JSON.stringify(value) : value,
        ),
      });

    if (playlistsIdGetData === undefined) {
      if (playlistsIdGetResponse.status === 404) throw errors.NOT_FOUND();
      throw errors.INTERNAL_SERVER_ERROR();
    }

    return playlistsIdGetData;
  },
);
