import { MessageDescriptor } from "@lingui/core";

import {
  UpdatePlaylistInput as InternalUpdatePlaylistInput,
  UpdatePlaylistOutput as InternalUpdatePlaylistOutput,
} from "../../../../lib/pelican/playlists/update-playlist";

export type UpdatePlaylistInput = {
  data: InternalUpdatePlaylistInput["data"];
  id: InternalUpdatePlaylistInput["id"];
};

export type UpdatePlaylistSuccessOutput = {
  data: InternalUpdatePlaylistOutput["playlist"];
  error?: never;
};

export type UpdatePlaylistErrorOutput = {
  data?: never;
  error: MessageDescriptor;
};

export type UpdatePlaylistOutput =
  | UpdatePlaylistErrorOutput
  | UpdatePlaylistSuccessOutput;
