import type { MessageDescriptor } from "@lingui/core";
import type { ModalProps } from "@mantine/core";

export type RouteModalInput = Omit<
  ModalProps,
  "onClose" | "opened" | "title"
> & {
  fallback: string;
  title?: MessageDescriptor | string;
};
