import { msg } from "@lingui/core/macro";
import { ORPCError } from "@orpc/client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import type { UserSynchronizerInput } from "./types";

import { orpcClientSideQueryClient } from "../../../../../../client/orpc/vars/clients";
import { useSafeContext } from "../../../../../generic/hooks/use-safe-context";
import { useNotifications } from "../../../../../notifications/hooks/use-notifications";
import { IdentityContext } from "../../../../contexts/identity";

export function UserSynchronizer({}: UserSynchronizerInput) {
  const [unauthenticated, setUnauthenticated] = useState(false);
  const [notification, setNotification] = useState<string>();

  const identity = useSafeContext(IdentityContext);

  const { notifications } = useNotifications();

  const getUserQuery = useQuery(
    orpcClientSideQueryClient.identity.getUser.queryOptions(),
  );

  useEffect(() => {
    if (getUserQuery.data === undefined) return;
    identity.user = getUserQuery.data.user;
  }, [getUserQuery.data, identity]);

  useEffect(() => {
    const error = getUserQuery.error;

    if (
      unauthenticated ||
      !(error instanceof ORPCError) ||
      error.code !== "UNAUTHORIZED"
    )
      return;

    setUnauthenticated(true);
  }, [unauthenticated, getUserQuery.error]);

  useEffect(() => {
    const error = getUserQuery.error;

    if (!unauthenticated || error !== null) return;

    setUnauthenticated(false);
  }, [unauthenticated, getUserQuery.error]);

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

    setNotification(id);

    return () => notifications.remove(id);
  }, [unauthenticated, notifications.error, notifications.remove]);

  useEffect(() => {
    if (unauthenticated || !notification) return;

    notifications.remove(notification);
    setNotification(undefined);
  }, [unauthenticated, notification, notifications.remove]);

  return null;
}
