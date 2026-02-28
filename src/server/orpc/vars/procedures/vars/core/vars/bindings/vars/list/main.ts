import { mapValues } from "es-toolkit/object";
import { isJSONValue } from "es-toolkit/predicate";

import { state } from "../../../../../../../../../state/vars/state";
import { orpcServerRootBase } from "../../../../../../../bases/root";

export const list = orpcServerRootBase.core.bindings.list.handler(
  async ({ errors, input }) => {
    const { data: bindingsListData } =
      await state.current.apis.pelican.bindingsList({
        query: mapValues(input ?? {}, (value) =>
          isJSONValue(value) ? JSON.stringify(value) : value,
        ),
      });

    if (bindingsListData === undefined) throw errors.INTERNAL_SERVER_ERROR();

    return bindingsListData;
  },
);
