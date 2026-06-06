import { msg } from "@lingui/core/macro";
import {
  notifications as mantineNotifications,
  useNotifications as useMantineNotifications,
} from "@mantine/notifications";
import { useCallback, useMemo } from "react";

import type {
  NotificationOptions,
  UseNotificationsInput,
  UseNotificationsOutput,
} from "./types";

import { useLocalization } from "../../../localization/hooks/use-localization";
import { constants } from "./constants";

export function useNotifications({}: UseNotificationsInput = {}): UseNotificationsOutput {
  const { localization } = useLocalization();

  const mantineNotificationsState = useMantineNotifications();

  const show = useCallback(
    (options: NotificationOptions) =>
      mantineNotifications.show({
        ...options,
        message:
          typeof options.message === "string"
            ? options.message
            : localization.localize(options.message),
      }),
    [localization.localize],
  );

  const error = useCallback(
    (options: NotificationOptions) =>
      show({
        ...options,
        color: constants.colors.error,
        icon: constants.icons.error,
        title: localization.localize(msg({ message: "Error" })),
      }),
    [localization.localize, show],
  );

  const info = useCallback(
    (options: NotificationOptions) =>
      show({
        ...options,
        color: constants.colors.info,
        icon: constants.icons.info,
        title: localization.localize(msg({ message: "Info" })),
      }),
    [localization.localize, show],
  );

  const success = useCallback(
    (options: NotificationOptions) =>
      show({
        ...options,
        color: constants.colors.success,
        icon: constants.icons.success,
        title: localization.localize(msg({ message: "Success" })),
      }),
    [localization.localize, show],
  );

  const warning = useCallback(
    (options: NotificationOptions) =>
      show({
        ...options,
        color: constants.colors.warning,
        icon: constants.icons.warning,
        title: localization.localize(msg({ message: "Warning" })),
      }),
    [localization.localize, show],
  );

  const update = useCallback(
    (id: string, options: NotificationOptions) =>
      mantineNotifications.update({
        id: id,
        ...options,
        message:
          typeof options.message === "string"
            ? options.message
            : localization.localize(options.message),
      }),
    [localization.localize],
  );

  const remove = useCallback((id: string) => mantineNotifications.hide(id), []);

  const clean = useCallback(() => mantineNotifications.clean(), []);

  const state = useMemo(
    () => ({
      displayed: mantineNotificationsState.notifications.map(({ id }) => id!),
      queued: mantineNotificationsState.queue.map(({ id }) => id!),
    }),
    [mantineNotificationsState.notifications, mantineNotificationsState.queue],
  );

  const notifications = useMemo(
    () => ({
      clean: clean,
      error: error,
      info: info,
      remove: remove,
      state: state,
      success: success,
      update: update,
      warning: warning,
    }),
    [clean, error, info, remove, state, success, update, warning],
  );

  return useMemo(() => ({ notifications: notifications }), [notifications]);
}
