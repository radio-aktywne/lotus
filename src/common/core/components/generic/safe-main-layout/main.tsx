import type { SafeMainLayoutInput } from "./types";

import classes from "./styles.module.css";

export function SafeMainLayout({ children }: SafeMainLayoutInput) {
  return (
    <div className={classes.outer}>
      <div className={classes.inner}>{children}</div>
    </div>
  );
}
