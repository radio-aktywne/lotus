import { MessageDescriptor } from "@lingui/core";

import {
  ListPlaylistsInput,
  ListPlaylistsOutput,
} from "../../../../lib/pelican/playlists/list-playlists";

export type UseListPlaylistsInput = {
  include?: ListPlaylistsInput["include"];
  interval?: number;
  limit?: ListPlaylistsInput["limit"];
  offset?: ListPlaylistsInput["offset"];
  order?: ListPlaylistsInput["order"];
  where?: ListPlaylistsInput["where"];
};

export type UseListPlaylistsLoadingState = {
  data?: never;
  error?: never;
  loading: true;
};

export type UseListPlaylistsErrorState = {
  data?: never;
  error: MessageDescriptor;
  loading: false;
};

export type UseListPlaylistsSuccessState = {
  data: ListPlaylistsOutput["playlists"];
  error?: never;
  loading: false;
};

export type UseListPlaylistsState =
  | UseListPlaylistsErrorState
  | UseListPlaylistsLoadingState
  | UseListPlaylistsSuccessState;

export type UseListPlaylistsOutput = {
  refresh: () => Promise<void>;
} & UseListPlaylistsState;
