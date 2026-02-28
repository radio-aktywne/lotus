import type { Edge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import type { RefObject } from "react";

export type UseDropDefaultEdges = readonly ["top", "bottom"];

export type UseDropData = undefined | { [key: string]: unknown };

export type UseDropSource = {
  data: UseDropData;
  type: string;
};

export type UseDropDraggingOverState<
  E extends readonly Edge[] = UseDropDefaultEdges,
> = {
  draggingOver: true;
  edge: E[number];
  source: UseDropSource;
};

export type UseDropIdleState = {
  draggingOver: false;
};

export type UseDropState<E extends readonly Edge[] = UseDropDefaultEdges> =
  | UseDropDraggingOverState<E>
  | UseDropIdleState;

export type UseDropInput<E extends readonly Edge[] = UseDropDefaultEdges> = {
  accept?: (type: string, data?: UseDropData) => boolean;
  data?: UseDropData;
  edges?: E;
  type: string;
};

export type UseDropOutput<
  R extends HTMLElement,
  E extends readonly Edge[] = UseDropDefaultEdges,
> = {
  ref: RefObject<null | R>;
  state: UseDropState<E>;
};
