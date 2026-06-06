"use client";

import { msg } from "@lingui/core/macro";
import { Title } from "@mantine/core";

import type { NotFoundWidgetInput } from "./types";

import { useLocalization } from "../../../../localization/hooks/use-localization";

export function NotFoundWidget({ message }: NotFoundWidgetInput) {
  const { localization } = useLocalization();

  return (
    <Title ta="center">
      {localization.localize(message ?? msg({ message: "Page not found" }))}
    </Title>
  );
}
