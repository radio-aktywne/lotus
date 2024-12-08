import { MessageDescriptor } from "@lingui/core";

import { DeletePlaylistInput as InternalDeletePlaylistInput } from "../../../../lib/pelican/playlists/delete-playlist";

export type DeletePlaylistInput = {
  id: InternalDeletePlaylistInput["id"];
};

export type DeletePlaylistSuccessOutput = {
  error?: never;
};

export type DeletePlaylistErrorOutput = {
  error: MessageDescriptor;
};

export type DeletePlaylistOutput =
  | DeletePlaylistErrorOutput
  | DeletePlaylistSuccessOutput;
