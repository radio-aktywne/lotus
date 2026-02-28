import { mapValues } from "es-toolkit/object";
import { isJSONValue } from "es-toolkit/predicate";

import { state } from "../../../../../../../../../state/vars/state";
import { orpcServerRootBase } from "../../../../../../../bases/root";

export const update = orpcServerRootBase.core.playlists.update.handler(
  async ({ errors, input }) => {
    const { data, id, ...query } = input;

    const { data: playlistsIdUpdateData, response: playlistsIdUpdateResponse } =
      await state.current.apis.pelican.playlistsIdUpdate({
        body: data,
        path: { id: id },
        query: mapValues(query, (value) =>
          isJSONValue(value) ? JSON.stringify(value) : value,
        ),
      });

    if (playlistsIdUpdateData === undefined) {
      if (playlistsIdUpdateResponse.status === 404) throw errors.NOT_FOUND();
      throw errors.INTERNAL_SERVER_ERROR();
    }

    return playlistsIdUpdateData;
  },
);
