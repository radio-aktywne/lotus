"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Title } from "@mantine/core";

import { BindingNotFoundViewInput } from "./types";

export function BindingNotFoundView({}: BindingNotFoundViewInput) {
  const { _ } = useLingui();

  return <Title>{_(msg({ message: "Binding not found." }))}</Title>;
}
