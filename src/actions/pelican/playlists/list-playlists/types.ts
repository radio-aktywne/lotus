import { MessageDescriptor } from "@lingui/core";

import {
  ListPlaylistsInput as InternalListPlaylistsInput,
  ListPlaylistsOutput as InternalListPlaylistsOutput,
} from "../../../../lib/pelican/playlists/list-playlists";

export type ListPlaylistsInput = {
  include?: InternalListPlaylistsInput["include"];
  limit?: InternalListPlaylistsInput["limit"];
  offset?: InternalListPlaylistsInput["offset"];
  order?: InternalListPlaylistsInput["order"];
  where?: InternalListPlaylistsInput["where"];
};

export type ListPlaylistsSuccessOutput = {
  data: InternalListPlaylistsOutput["playlists"];
  error?: never;
};

export type ListPlaylistsErrorOutput = {
  data?: never;
  error: MessageDescriptor;
};

export type ListPlaylistsOutput =
  | ListPlaylistsErrorOutput
  | ListPlaylistsSuccessOutput;
