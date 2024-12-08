import { MessageDescriptor } from "@lingui/core";

import {
  HeadMediaContentInput,
  HeadMediaContentOutput,
} from "../../../../../lib/pelican/media/content/head-media-content";

export type UseHeadMediaContentInput = {
  id: HeadMediaContentInput["id"];
  interval?: number;
};

export type UseHeadMediaContentLoadingState = {
  error?: never;
  etag?: never;
  length?: never;
  loading: true;
  modified?: never;
  type?: never;
};

export type UseHeadMediaContentErrorState = {
  error: MessageDescriptor;
  etag?: never;
  length?: never;
  loading: false;
  modified?: never;
  type?: never;
};

export type UseHeadMediaContentSuccessState = {
  error?: never;
  etag: HeadMediaContentOutput["etag"];
  length: HeadMediaContentOutput["length"];
  loading: false;
  modified: HeadMediaContentOutput["modified"];
  type: HeadMediaContentOutput["type"];
};

export type UseHeadMediaContentState =
  | UseHeadMediaContentErrorState
  | UseHeadMediaContentLoadingState
  | UseHeadMediaContentSuccessState;

export type UseHeadMediaContentOutput = {
  refresh: () => Promise<void>;
} & UseHeadMediaContentState;
