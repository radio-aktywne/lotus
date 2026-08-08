import type { ModalProps } from "@mantine/core";

export type RouteModalInput = Omit<ModalProps, "onClose" | "opened"> & {
  fallback: string;
  force?: boolean;
};
