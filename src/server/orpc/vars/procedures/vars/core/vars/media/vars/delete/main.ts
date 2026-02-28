import { state } from "../../../../../../../../../state/vars/state";
import { orpcServerRootBase } from "../../../../../../../bases/root";

export const delete_ = orpcServerRootBase.core.media.delete.handler(
  async ({ errors, input }) => {
    const { id } = input;

    const { data: mediaIdDeleteData, response: mediaIdDeleteResponse } =
      await state.current.apis.pelican.mediaIdDelete({ path: { id: id } });

    if (mediaIdDeleteData === undefined) {
      if (mediaIdDeleteResponse.status === 404) throw errors.NOT_FOUND();
      throw errors.INTERNAL_SERVER_ERROR();
    }
  },
);
