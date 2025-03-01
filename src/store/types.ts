import { StateCreator } from "zustand";
import { PersistOptions } from "zustand/middleware";

export type Store = StoreActions & StoreState;

export type StoreInitializer = StateCreator<Store, [["zustand/immer", never]]>;

export type StorePersistOptions = PersistOptions<Store>;

type StoreState = {
  [key: string]: never;
};

type StoreActions = {
  [key: string]: never;
};
