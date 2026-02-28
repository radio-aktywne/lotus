"use client";

import { msg } from "@lingui/core/macro";
import { Stack, Title } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react";

import type { TestFormSubmitInput } from "./components/test-form";
import type { TestWidgetInput } from "./types";

import { dayjs } from "../../../../common/dates/vars/dayjs";
import { getValidationIssue } from "../../../../common/orpc/lib/get-validation-issue";
import { isOrpcDefinedError } from "../../../../common/orpc/lib/is-orpc-defined-error";
import { useLocalization } from "../../../../isomorphic/localization/hooks/use-localization";
import { useNotifications } from "../../../../isomorphic/notifications/hooks/use-notifications";
import { useNow } from "../../../generic/hooks/use-now";
import { orpcClientSideQueryClient } from "../../../orpc/vars/clients";
import { TestForm } from "./components/test-form";

export function TestWidget({}: TestWidgetInput) {
  const { localization } = useLocalization();
  const { notifications } = useNotifications();
  const { timestamp } = useNow();

  const validateMutation = useMutation(
    orpcClientSideQueryClient.test.validate.mutationOptions(),
  );

  const [initialValues] = useState(() => ({ value: "" }));

  const handleSubmit = useCallback(
    async ({ values }: TestFormSubmitInput) => {
      try {
        const { message } = await validateMutation.mutateAsync({
          value: values.value,
        });

        notifications.success({ message: message });
      } catch (error) {
        if (isOrpcDefinedError(error) && error.code === "BAD_REQUEST") {
          notifications.error({ message: msg({ message: "Invalid input" }) });

          return {
            errors: {
              value: getValidationIssue({ error: error, path: "value" })
                .message,
            },
          };
        }

        notifications.error({
          message: msg({ message: "An unexpected error occurred" }),
        });

        throw error;
      }
    },
    [notifications.error, notifications.success, validateMutation.mutateAsync],
  );

  const handleError = useCallback(() => {
    notifications.error({ message: msg({ message: "Invalid input" }) });
  }, [notifications.error]);

  return (
    <Stack align="stretch" gap="xl">
      <Title ta="center">
        {dayjs.unix(timestamp).locale(localization.locale).format("LL")}
      </Title>
      <Title ta="center">
        {dayjs.unix(timestamp).locale(localization.locale).format("LTS")}
      </Title>
      <TestForm
        initialValues={initialValues}
        onError={handleError}
        onSubmit={handleSubmit}
      />
    </Stack>
  );
}
