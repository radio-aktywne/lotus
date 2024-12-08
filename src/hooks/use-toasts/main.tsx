import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { showNotification } from "@mantine/notifications";
import "client-only";
import { useCallback, useMemo } from "react";

import { colors, icons } from "./constants";
import { Toast, UseToastsInput, UseToastsOutput } from "./types";

export function useToasts({}: UseToastsInput = {}): UseToastsOutput {
  const { _ } = useLingui();

  const error: Toast = useCallback(
    (message: string) => {
      showNotification({
        color: colors.error,
        icon: icons.error,
        message: message,
        title: _(msg({ message: "Error" })),
      });
    },
    [_],
  );

  const info: Toast = useCallback(
    (message: string) => {
      showNotification({
        color: colors.info,
        icon: icons.info,
        message: message,
        title: _(msg({ message: "Info" })),
      });
    },
    [_],
  );

  const success: Toast = useCallback(
    (message: string) => {
      showNotification({
        color: colors.success,
        icon: icons.success,
        message: message,
        title: _(msg({ message: "Success" })),
      });
    },
    [_],
  );

  const warning: Toast = useCallback(
    (message: string) => {
      showNotification({
        color: colors.warning,
        icon: icons.warning,
        message: message,
        title: _(msg({ message: "Warning" })),
      });
    },
    [_],
  );

  return useMemo(
    () => ({ error, info, success, warning }),
    [error, info, success, warning],
  );
}
