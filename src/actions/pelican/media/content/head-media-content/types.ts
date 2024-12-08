import { MessageDescriptor } from "@lingui/core";

import {
  HeadMediaContentInput as InternalHeadMediaContentInput,
  HeadMediaContentOutput as InternalHeadMediaContentOutput,
} from "../../../../../lib/pelican/media/content/head-media-content";

export type HeadMediaContentInput = {
  id: InternalHeadMediaContentInput["id"];
};

export type HeadMediaContentSuccessOutput = {
  error?: never;
  etag: InternalHeadMediaContentOutput["etag"];
  length: InternalHeadMediaContentOutput["length"];
  modified: InternalHeadMediaContentOutput["modified"];
  type: InternalHeadMediaContentOutput["type"];
};

export type HeadMediaContentErrorOutput = {
  error: MessageDescriptor;
  etag?: never;
  length?: never;
  modified?: never;
  type?: never;
};

export type HeadMediaContentOutput =
  | HeadMediaContentErrorOutput
  | HeadMediaContentSuccessOutput;
