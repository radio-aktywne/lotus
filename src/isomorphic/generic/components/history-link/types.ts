import type { LocalizedLinkInput } from "../../../routing/components/localized-link";
import type { HistoryEntry } from "../../../state/types";

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

export type HistoryLinkInput = LocalizedLinkInput & {
  actions: HistoryLinkActions;
};
