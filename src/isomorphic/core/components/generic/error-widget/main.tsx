import { msg } from "@lingui/core/macro";
import { Button, Stack, Title } from "@mantine/core";
import { TbRefresh } from "react-icons/tb";

import type { ErrorWidgetInput } from "./types";

import { useLocalization } from "../../../../localization/hooks/use-localization";

export function ErrorWidget({ message, reset }: ErrorWidgetInput) {
  const { localization } = useLocalization();

  return (
    <Stack>
      <Title ta="center">
        {localization.localize(
          message ?? msg({ message: "Something went wrong" }),
        )}
      </Title>
      <Button
        color="gray"
        leftSection={<TbRefresh />}
        onClick={reset}
        variant="subtle"
      >
        {localization.localize(msg({ message: "Retry" }))}
      </Button>
    </Stack>
  );
}
