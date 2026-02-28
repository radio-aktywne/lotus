import { mapValues } from "es-toolkit/object";
import { isJSONValue } from "es-toolkit/predicate";

import { state } from "../../../../../../../../../state/vars/state";
import { orpcServerRootBase } from "../../../../../../../bases/root";

export const update = orpcServerRootBase.core.bindings.update.handler(
  async ({ errors, input }) => {
    const { data, id, ...query } = input;

    const { data: bindingsIdUpdateData, response: bindingsIdUpdateResponse } =
      await state.current.apis.pelican.bindingsIdUpdate({
        body: data,
        path: { id: id },
        query: mapValues(query, (value) =>
          isJSONValue(value) ? JSON.stringify(value) : value,
        ),
      });

    if (bindingsIdUpdateData === undefined) {
      if (bindingsIdUpdateResponse.status === 404) throw errors.NOT_FOUND();
      throw errors.INTERNAL_SERVER_ERROR();
    }

    return bindingsIdUpdateData;
  },
);
