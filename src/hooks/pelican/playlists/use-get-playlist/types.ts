import { MessageDescriptor } from "@lingui/core";

import {
  GetPlaylistInput,
  GetPlaylistOutput,
} from "../../../../lib/pelican/playlists/get-playlist";

export type UseGetPlaylistInput = {
  id: GetPlaylistInput["id"];
  include?: GetPlaylistInput["include"];
  interval?: number;
};

export type UseGetPlaylistLoadingState = {
  data?: never;
  error?: never;
  loading: true;
};

export type UseGetPlaylistErrorState = {
  data?: never;
  error: MessageDescriptor;
  loading: false;
};

export type UseGetPlaylistSuccessState = {
  data: GetPlaylistOutput["playlist"];
  error?: never;
  loading: false;
};

export type UseGetPlaylistState =
  | UseGetPlaylistErrorState
  | UseGetPlaylistLoadingState
  | UseGetPlaylistSuccessState;

export type UseGetPlaylistOutput = {
  refresh: () => Promise<void>;
} & UseGetPlaylistState;
