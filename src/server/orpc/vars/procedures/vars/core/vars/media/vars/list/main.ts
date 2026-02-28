import { mapValues } from "es-toolkit/object";
import { isJSONValue } from "es-toolkit/predicate";

import { state } from "../../../../../../../../../state/vars/state";
import { orpcServerRootBase } from "../../../../../../../bases/root";

export const list = orpcServerRootBase.core.media.list.handler(
  async ({ errors, input }) => {
    const { data: mediaListData } = await state.current.apis.pelican.mediaList({
      query: mapValues(input ?? {}, (value) =>
        isJSONValue(value) ? JSON.stringify(value) : value,
      ),
    });

    if (mediaListData === undefined) throw errors.INTERNAL_SERVER_ERROR();

    return mediaListData;
  },
);
