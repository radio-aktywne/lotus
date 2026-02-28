import type { StorageData } from "./types";

export const storage = new AsyncLocalStorage<StorageData>();
