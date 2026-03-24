import { Loader } from "@mantine/core";
import { Center } from "@radio-aktywne/ui";

import type { LoadingWidgetInput } from "./types";

export function LoadingWidget({ type }: LoadingWidgetInput) {
  return (
    <Center>
      <Loader type={type} />
    </Center>
  );
}
