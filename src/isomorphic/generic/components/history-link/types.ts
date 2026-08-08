import type { HistoryEntry } from "../../../state/types";
import type { ClientLinkInput } from "../client-link";

export type HistoryLinkPopAction = {
  count?: number;
  type: "pop";
};

export type HistoryLinkPushAction = {
  entries: HistoryEntry[];
  type: "push";
};

export type HistoryLinkAction = HistoryLinkPopAction | HistoryLinkPushAction;

export type HistoryLinkActions = HistoryLinkAction[];

export type HistoryLinkInput = ClientLinkInput & {
  actions: HistoryLinkActions;
};
