import { MessageDescriptor } from "@lingui/core";

import {
  GetPlaylistInput as InternalGetPlaylistInput,
  GetPlaylistOutput as InternalGetPlaylistOutput,
} from "../../../../lib/pelican/playlists/get-playlist";

export type GetPlaylistInput = {
  id: InternalGetPlaylistInput["id"];
  include?: InternalGetPlaylistInput["include"];
};

export type GetPlaylistSuccessOutput = {
  data: InternalGetPlaylistOutput["playlist"];
  error?: never;
};

export type GetPlaylistErrorOutput = {
  data?: never;
  error: MessageDescriptor;
};

export type GetPlaylistOutput =
  | GetPlaylistErrorOutput
  | GetPlaylistSuccessOutput;
