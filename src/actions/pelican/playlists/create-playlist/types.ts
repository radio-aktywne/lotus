import { MessageDescriptor } from "@lingui/core";

import {
  CreatePlaylistInput as InternalCreatePlaylistInput,
  CreatePlaylistOutput as InternalCreatePlaylistOutput,
} from "../../../../lib/pelican/playlists/create-playlist";

export type CreatePlaylistInput = {
  id?: InternalCreatePlaylistInput["id"];
  name: InternalCreatePlaylistInput["name"];
};

export type CreatePlaylistSuccessOutput = {
  data: InternalCreatePlaylistOutput["playlist"];
  error?: never;
};

export type CreatePlaylistErrorOutput = {
  data?: never;
  error: MessageDescriptor;
};

export type CreatePlaylistOutput =
  | CreatePlaylistErrorOutput
  | CreatePlaylistSuccessOutput;
