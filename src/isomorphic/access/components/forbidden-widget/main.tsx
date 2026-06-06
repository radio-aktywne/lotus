"use client";

import { msg } from "@lingui/core/macro";
import { Title } from "@mantine/core";

import type { ForbiddenWidgetInput } from "./types";

import { useLocalization } from "../../../localization/hooks/use-localization";

export function ForbiddenWidget({ message }: ForbiddenWidgetInput) {
  const { localization } = useLocalization();

  return (
    <Title ta="center">
      {localization.localize(
        message ?? msg({ message: "You are not allowed to access this page" }),
      )}
    </Title>
  );
}
