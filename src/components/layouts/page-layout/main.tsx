import { Box } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import classes from "./styles.module.css";
import { PageLayoutInput } from "./types";

export function PageLayout({ children }: PageLayoutInput) {
  return (
    <>
      <Notifications position="top-right" />
      <Box className={classes.outter}>
        <Box className={classes.inner}>{children}</Box>
      </Box>
    </>
  );
}
