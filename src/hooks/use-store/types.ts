import { Store } from "../../store";

export type StoreSelector<T> = (state: Store) => T;

export type UseStoreInput<T> = {
  selector: StoreSelector<T>;
};

export type UseStoreOutput<T> = {
  hydrated: boolean;
  value: T;
};
