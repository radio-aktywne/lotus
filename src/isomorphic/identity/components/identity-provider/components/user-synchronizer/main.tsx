import { msg } from "@lingui/core/macro";
import { ORPCError } from "@orpc/client";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import type { UserSynchronizerInput } from "./types";

import { orpcClientSideQueryClient } from "../../../../../../client/orpc/vars/clients";
import { useSafeContext } from "../../../../../generic/hooks/use-safe-context";
import { useNotifications } from "../../../../../notifications/hooks/use-notifications";
import { IdentityContext } from "../../../../contexts/identity";

export function UserSynchronizer({}: UserSynchronizerInput) {
  const identity = useSafeContext(IdentityContext);

  const { notifications } = useNotifications();

  const getUserQuery = useQuery(
    orpcClientSideQueryClient.identity.getUser.queryOptions(),
  );

  const unauthenticated =
    getUserQuery.error instanceof ORPCError &&
    getUserQuery.error.code === "UNAUTHORIZED";

  useEffect(() => {
    if (getUserQuery.data === undefined) return;
    identity.user = getUserQuery.data.user;
  }, [getUserQuery.data, identity]);

  useEffect(() => {
    if (!unauthenticated) return;

    const id = notifications.error({
      autoClose: false,
      message: msg({
        message:
          "You are not authenticated. Reload the page to authenticate again.",
      }),
      withCloseButton: false,
    });

    return () => notifications.remove(id);
  }, [unauthenticated, notifications.error, notifications.remove]);

  return null;
}
