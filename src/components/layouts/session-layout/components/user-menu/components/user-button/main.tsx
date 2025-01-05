import { ActionIcon } from "@mantine/core";
import { IconUserCircle } from "@tabler/icons-react";
import { forwardRef } from "react";

import { UserButtonInput } from "./types";

export const UserButton = forwardRef<HTMLButtonElement, UserButtonInput>(
  function UserButton({ ...buttonProps }, ref) {
    return (
      <ActionIcon ref={ref} size="xl" variant="light" {...buttonProps}>
        <IconUserCircle />
      </ActionIcon>
    );
  },
);
