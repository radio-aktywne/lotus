import { mapValues } from "es-toolkit/object";
import { isJSONValue } from "es-toolkit/predicate";

import { state } from "../../../../../../../../../state/vars/state";
import { orpcServerRootBase } from "../../../../../../../bases/root";

export const create = orpcServerRootBase.core.bindings.create.handler(
  async ({ errors, input }) => {
    const { data, ...query } = input;

    const { data: bindingsCreateData, response: bindingsCreateResponse } =
      await state.current.apis.pelican.bindingsCreate({
        body: data,
        query: mapValues(query, (value) =>
          isJSONValue(value) ? JSON.stringify(value) : value,
        ),
      });

    if (bindingsCreateData === undefined) {
      if (bindingsCreateResponse.status === 404) throw errors.NOT_FOUND();
      throw errors.INTERNAL_SERVER_ERROR();
    }

    return bindingsCreateData;
  },
);
