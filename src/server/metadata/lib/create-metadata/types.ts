import type { MessageDescriptor } from "@lingui/core";
import type { Metadata } from "next";

export type CreateMetadataInput = {
  description?: MessageDescriptor | null | string;
  title?: MessageDescriptor | null | string;
};

export type CreateMetadataOutput = Metadata;
