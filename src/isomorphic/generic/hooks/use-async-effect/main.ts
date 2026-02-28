import { useEffect, useRef } from "react";

import type {
  UseAsyncEffectCallback,
  UseAsyncEffectDependencies,
  UseAsyncEffectDestructor,
} from "./types";

export function useAsyncEffect(
  callback: UseAsyncEffectCallback,
  dependencies: UseAsyncEffectDependencies,
  destructor?: UseAsyncEffectDestructor,
): void {
  const callbackRef = useRef(callback);
  const destructorRef = useRef(destructor);

  useEffect(() => {
    const currentCallback = callbackRef.current;
    const currentDestructor = destructorRef.current;

    let active = true;
    const isActive = () => active;

    void currentCallback(isActive);

    return () => {
      active = false;
      currentDestructor?.();
    };
  }, dependencies);
}
