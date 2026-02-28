import { isPlainObject } from "es-toolkit/predicate";

export function isMiddlewareExecuted(context: unknown, name: string): boolean {
  const key = `${name}Middleware`;

  return (
    isPlainObject(context) &&
    key in context &&
    isPlainObject(context[key]) &&
    "executed" in context[key] &&
    context[key].executed === true
  );
}
