import "client-only";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { stateStorageKey } from "../constants";
import { Store, StoreInitializer, StorePersistOptions } from "./types";

const initializer: StoreInitializer = () => ({});

const persistOptions: StorePersistOptions = {
  name: stateStorageKey,
};

export const store = create<Store>()(
  persist(immer(initializer), persistOptions),
);
