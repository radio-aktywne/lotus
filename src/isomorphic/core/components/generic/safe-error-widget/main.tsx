import type { SafeErrorWidgetInput } from "./types";

import classes from "./styles.module.css";

export function SafeErrorWidget({ message, reset }: SafeErrorWidgetInput) {
  return (
    <div className={classes.stack}>
      <h1 className={classes.title}>{message}</h1>
      <button className={classes["button-root"]} onClick={reset}>
        <span className={classes["button-inner"]}>
          <span className={classes["button-label"]}>Retry</span>
        </span>
      </button>
    </div>
  );
}
