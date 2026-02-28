import { mapValues } from "es-toolkit/object";
import { isJSONValue } from "es-toolkit/predicate";

import { state } from "../../../../../../../../../state/vars/state";
import { orpcServerRootBase } from "../../../../../../../bases/root";

export const create = orpcServerRootBase.core.playlists.create.handler(
  async ({ errors, input }) => {
    const { data, ...query } = input;

    const { data: playlistsCreateData, response: playlistsCreateResponse } =
      await state.current.apis.pelican.playlistsCreate({
        body: data,
        query: mapValues(query, (value) =>
          isJSONValue(value) ? JSON.stringify(value) : value,
        ),
      });

    if (playlistsCreateData === undefined) {
      if (playlistsCreateResponse.status === 404) throw errors.NOT_FOUND();
      throw errors.INTERNAL_SERVER_ERROR();
    }

    return playlistsCreateData;
  },
);
