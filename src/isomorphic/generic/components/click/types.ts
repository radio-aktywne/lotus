import type { PolymorphicComponentProps } from "@mantine/core";
import type { ElementType } from "react";

export type BaseClickInput = object;

export type ClickInput<C extends ElementType = "a"> = PolymorphicComponentProps<
  C,
  BaseClickInput
>;
