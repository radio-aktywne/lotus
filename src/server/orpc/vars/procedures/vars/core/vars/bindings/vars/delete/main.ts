import { state } from "../../../../../../../../../state/vars/state";
import { orpcServerRootBase } from "../../../../../../../bases/root";

export const delete_ = orpcServerRootBase.core.bindings.delete.handler(
  async ({ errors, input }) => {
    const { id } = input;

    const { data: bindingsIdDeleteData, response: bindingsIdDeleteResponse } =
      await state.current.apis.pelican.bindingsIdDelete({ path: { id: id } });

    if (bindingsIdDeleteData === undefined) {
      if (bindingsIdDeleteResponse.status === 404) throw errors.NOT_FOUND();
      throw errors.INTERNAL_SERVER_ERROR();
    }
  },
);
