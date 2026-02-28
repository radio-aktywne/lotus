import type { RefObject } from "react";

export type UseDragData = undefined | { [key: string]: unknown };

export type UseDragDraggingState = {
  dragging: true;
};

export type UseDragIdleState = {
  dragging: false;
};

export type UseDragState = UseDragDraggingState | UseDragIdleState;

export type UseDragInput = {
  data?: UseDragData;
  type: string;
};

export type UseDragOutput<T extends HTMLElement> = {
  preview: HTMLElement | undefined;
  ref: RefObject<null | T>;
  state: UseDragState;
};
