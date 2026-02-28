"use client";

import { Title } from "@mantine/core";

import type { NotFoundWidgetInput } from "./types";

import { useLocalization } from "../../../../localization/hooks/use-localization";

export function NotFoundWidget({ message }: NotFoundWidgetInput) {
  const { localization } = useLocalization();

  return <Title>{localization.localize(message)}</Title>;
}
