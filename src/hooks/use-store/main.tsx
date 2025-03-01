import "client-only";
import { useEffect, useMemo, useState } from "react";

import { store } from "../../store";
import { UseStoreInput, UseStoreOutput } from "./types";

export function useStore<T>({ selector }: UseStoreInput<T>): UseStoreOutput<T> {
  const [hydrated, setHydrated] = useState(false);
  const value = store(selector);

  const persist = store.persist;

  useEffect(() => {
    const unsubHydrate = persist.onHydrate(() => {
      setHydrated(false);
    });
    const unsubFinishHydration = persist.onFinishHydration(() => {
      setHydrated(true);
    });

    setHydrated(persist.hasHydrated());

    return () => {
      unsubHydrate();
      unsubFinishHydration();
    };
  }, [persist]);

  useEffect(() => {
    const handleStorageEvent = (e: StorageEvent) =>
      e.newValue && e.key === persist.getOptions().name && persist.rehydrate();

    window.addEventListener("storage", handleStorageEvent);

    return () => {
      window.removeEventListener("storage", handleStorageEvent);
    };
  }, [persist]);

  return useMemo(() => ({ hydrated, value }), [hydrated, value]);
}
