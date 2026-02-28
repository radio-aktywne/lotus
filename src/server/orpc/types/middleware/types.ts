import type { Simplify } from "type-fest";

export type MiddlewareOutputContext<
  NameType extends string,
  ValuesType = object,
> = {
  [Name in NameType as `${Name}Middleware`]: Simplify<
    Omit<ValuesType, "executed"> & {
      executed: true;
    }
  >;
};
