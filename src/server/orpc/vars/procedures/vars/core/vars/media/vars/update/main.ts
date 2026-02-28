import { mapValues } from "es-toolkit/object";
import { isJSONValue } from "es-toolkit/predicate";

import { state } from "../../../../../../../../../state/vars/state";
import { orpcServerRootBase } from "../../../../../../../bases/root";

export const update = orpcServerRootBase.core.media.update.handler(
  async ({ errors, input }) => {
    const { data, id, ...query } = input;

    const { data: mediaIdUpdateData, response: mediaIdUpdateResponse } =
      await state.current.apis.pelican.mediaIdUpdate({
        body: data,
        path: { id: id },
        query: mapValues(query, (value) =>
          isJSONValue(value) ? JSON.stringify(value) : value,
        ),
      });

    if (mediaIdUpdateData === undefined) {
      if (mediaIdUpdateResponse.status === 404) throw errors.NOT_FOUND();
      throw errors.INTERNAL_SERVER_ERROR();
    }

    return mediaIdUpdateData;
  },
);
