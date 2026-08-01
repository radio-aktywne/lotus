"use client";

import { Modal } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import type { RouteModalInput } from "./types";

import { useLocalization } from "../../../localization/hooks/use-localization";
import { useHistory } from "../../hooks/use-history";

export function RouteModal({ fallback, title, ...props }: RouteModalInput) {
  const router = useRouter();

  const { history } = useHistory();
  const { localization } = useLocalization();

  const handleClose = useCallback(() => {
    if (history.entries.length > 1) router.back();
    else router.push(fallback);
  }, [fallback, history.entries.length, router]);

  return (
    <Modal
      {...props}
      onClose={handleClose}
      opened={true}
      title={
        title === undefined || typeof title === "string"
          ? title
          : localization.localize(title)
      }
    />
  );
}
