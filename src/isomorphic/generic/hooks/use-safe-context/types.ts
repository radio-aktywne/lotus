import type { Context } from "react";

export type UseSafeContextContext<T> = Context<T | undefined>;

export type UseSafeContextName = string | undefined;
