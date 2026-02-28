import { mapValues } from "es-toolkit/object";
import { isJSONValue } from "es-toolkit/predicate";

import { state } from "../../../../../../../../../state/vars/state";
import { orpcServerRootBase } from "../../../../../../../bases/root";

export const get = orpcServerRootBase.core.media.get.handler(
  async ({ errors, input }) => {
    const { id, ...query } = input;

    const { data: mediaIdGetData, response: mediaIdGetResponse } =
      await state.current.apis.pelican.mediaIdGet({
        path: { id: id },
        query: mapValues(query, (value) =>
          isJSONValue(value) ? JSON.stringify(value) : value,
        ),
      });

    if (mediaIdGetData === undefined) {
      if (mediaIdGetResponse.status === 404) throw errors.NOT_FOUND();
      throw errors.INTERNAL_SERVER_ERROR();
    }

    return mediaIdGetData;
  },
);
