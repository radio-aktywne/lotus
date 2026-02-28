import { state } from "../../../../../../../../../state/vars/state";
import { orpcServerRootBase } from "../../../../../../../bases/root";

export const delete_ = orpcServerRootBase.core.playlists.delete.handler(
  async ({ errors, input }) => {
    const { id } = input;

    const { data: playlistsIdDeleteData, response: playlistsIdDeleteResponse } =
      await state.current.apis.pelican.playlistsIdDelete({ path: { id: id } });

    if (playlistsIdDeleteData === undefined) {
      if (playlistsIdDeleteResponse.status === 404) throw errors.NOT_FOUND();
      throw errors.INTERNAL_SERVER_ERROR();
    }
  },
);
