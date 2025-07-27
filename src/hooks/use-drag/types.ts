import { RefObject } from "react";

export type UseDragData = { [key: string]: unknown } | undefined;

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

export type UseDragOutput<T> = {
  preview: HTMLElement | undefined;
  ref: RefObject<T>;
  state: UseDragState;
};
