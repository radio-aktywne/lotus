import { msg } from "@lingui/core/macro";
import { Button, Stack, Title } from "@mantine/core";
import { useCallback, useState } from "react";
import { useDeepCompareMemo } from "use-deep-compare";

import type { EditMediaWidgetInput, EditMediaWidgetSaveInput } from "./types";

import { useLocalization } from "../../../../../../isomorphic/localization/hooks/use-localization";
import { useNotifications } from "../../../../../../isomorphic/notifications/hooks/use-notifications";
import { EditMediaForm } from "./components/edit-media-form";

export function EditMediaWidget({
  media,
  onBack,
  onSave,
}: EditMediaWidgetInput) {
  const [saving, setSaving] = useState(false);

  const { localization } = useLocalization();
  const { notifications } = useNotifications();

  const initialValues = useDeepCompareMemo(
    () => ({
      name: media.name,
    }),
    [media],
  );

  const handleSave = useCallback(
    async (input: EditMediaWidgetSaveInput) => {
      if (saving || !onSave) return;

      setSaving(true);

      try {
        return await onSave(input);
      } finally {
        setSaving(false);
      }
    },
    [onSave, saving],
  );

  const handleError = useCallback(() => {
    notifications.error({ message: msg({ message: "Invalid input" }) });
  }, [notifications.error]);

  return (
    <Stack h="100%" w="100%">
      <Title ta="center">
        {localization.localize(msg({ message: "Edit media" }))}
      </Title>
      <EditMediaForm
        initialValues={initialValues}
        onError={handleError}
        onSubmit={handleSave}
      />
      <Button
        color="gray"
        disabled={saving}
        onClick={onBack}
        style={{ flexShrink: 0 }}
        variant="light"
      >
        {localization.localize(msg({ message: "Back" }))}
      </Button>
    </Stack>
  );
}
