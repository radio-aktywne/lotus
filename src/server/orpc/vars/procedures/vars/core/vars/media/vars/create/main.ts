import { mapValues } from "es-toolkit/object";
import { isJSONValue } from "es-toolkit/predicate";

import { state } from "../../../../../../../../../state/vars/state";
import { orpcServerRootBase } from "../../../../../../../bases/root";

export const create = orpcServerRootBase.core.media.create.handler(
  async ({ errors, input }) => {
    const { data, ...query } = input;

    const { data: mediaCreateData, response: mediaCreateResponse } =
      await state.current.apis.pelican.mediaCreate({
        body: data,
        query: mapValues(query, (value) =>
          isJSONValue(value) ? JSON.stringify(value) : value,
        ),
      });

    if (mediaCreateData === undefined) {
      if (mediaCreateResponse.status === 404) throw errors.NOT_FOUND();
      throw errors.INTERNAL_SERVER_ERROR();
    }

    return mediaCreateData;
  },
);
