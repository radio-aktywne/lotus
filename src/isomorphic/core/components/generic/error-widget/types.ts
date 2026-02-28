import type { MessageDescriptor } from "@lingui/core";

export type ErrorWidgetInput = {
  message: MessageDescriptor;
  reset: () => void;
};
