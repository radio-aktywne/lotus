"use client";

import { Modal } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import type { RouteModalInput } from "./types";

import { createUrl } from "../../../../common/generic/lib/create-url";
import { useHistory } from "../../hooks/use-history";

export function RouteModal({ fallback, force, ...input }: RouteModalInput) {
  const router = useRouter();

  const { history } = useHistory();

  const handleClose = useCallback(() => {
    if (!force && history.entries.length > 1) {
      const target = history.entries[history.entries.length - 2]!;
      const { url } = createUrl({ path: target.path, query: target.query });
      router.push(url);
    } else {
      router.push(fallback);
    }
  }, [fallback, force, history.entries, history.entries.length, router]);

  return <Modal {...input} onClose={handleClose} opened={true} />;
}
