import { msg } from "@lingui/core/macro";
import { Button, Stack, Title } from "@mantine/core";
import { useCallback, useMemo, useState } from "react";

import type {
  UploadMediaWidgetInput,
  UploadMediaWidgetUploadInput,
} from "./types";

import { useLocalization } from "../../../../../../isomorphic/localization/hooks/use-localization";
import { useNotifications } from "../../../../../../isomorphic/notifications/hooks/use-notifications";
import { UploadMediaForm } from "./components/upload-media-form";

export function UploadMediaWidget({
  onBack,
  onUpload,
}: UploadMediaWidgetInput) {
  const [uploading, setUploading] = useState(false);

  const { localization } = useLocalization();
  const { notifications } = useNotifications();

  const initialValues = useMemo(
    () => ({
      file: undefined,
      name: "",
    }),
    [],
  );

  const handleUpload = useCallback(
    async (input: UploadMediaWidgetUploadInput) => {
      if (uploading || !onUpload) return;

      setUploading(true);

      try {
        return await onUpload(input);
      } finally {
        setUploading(false);
      }
    },
    [onUpload, uploading],
  );

  const handleError = useCallback(() => {
    notifications.error({ message: msg({ message: "Invalid input" }) });
  }, [notifications.error]);

  return (
    <Stack h="100%" w="100%">
      <Title ta="center">
        {localization.localize(msg({ message: "Upload media" }))}
      </Title>
      <UploadMediaForm
        initialValues={initialValues}
        onError={handleError}
        onSubmit={handleUpload}
      />
      <Button
        color="gray"
        disabled={uploading}
        onClick={onBack}
        style={{ flexShrink: 0 }}
        variant="light"
      >
        {localization.localize(msg({ message: "Back" }))}
      </Button>
    </Stack>
  );
}
