import type { Edge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";

export type UseDropMonitorDefaultEdges = readonly ["top", "bottom"];

export type UseDropMonitorData = undefined | { [key: string]: unknown };

export type UseDropMonitorNode<
  D extends UseDropMonitorData = UseDropMonitorData,
  T extends string = string,
> = {
  data: D;
  type: T;
};

export type UseDropMonitorDropData<
  SD extends UseDropMonitorData = UseDropMonitorData,
  TD extends UseDropMonitorData = UseDropMonitorData,
  ST extends string = string,
  TT extends string = string,
  E extends readonly Edge[] = UseDropMonitorDefaultEdges,
> = {
  edge: E[number];
  source: UseDropMonitorNode<SD, ST>;
  target: UseDropMonitorNode<TD, TT>;
};

export type UseDropMonitorInput<
  SD extends UseDropMonitorData = UseDropMonitorData,
  TD extends UseDropMonitorData = UseDropMonitorData,
  ST extends string = string,
  TT extends string = string,
  E extends readonly Edge[] = UseDropMonitorDefaultEdges,
> = {
  onDrop: (data: UseDropMonitorDropData<SD, TD, ST, TT, E>) => void;
  source: ST;
  target: TT;
};
