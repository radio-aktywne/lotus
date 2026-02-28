import type { Edge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";

import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useEffect } from "react";

import type {
  UseDropMonitorData,
  UseDropMonitorDefaultEdges,
  UseDropMonitorInput,
} from "./types";

import { Schemas } from "./schemas";

export function useDropMonitor<
  SD extends UseDropMonitorData = UseDropMonitorData,
  TD extends UseDropMonitorData = UseDropMonitorData,
  ST extends string = string,
  TT extends string = string,
  E extends readonly Edge[] = UseDropMonitorDefaultEdges,
>({
  onDrop,
  source: sourceType,
  target: targetType,
}: UseDropMonitorInput<SD, TD, ST, TT, E>): void {
  useEffect(() => {
    return monitorForElements({
      canMonitor: ({ source }) => {
        const parsed = Schemas.Data.safeParse(source.data);

        if (!parsed.success) return false;

        return parsed.data.type === sourceType;
      },
      onDrop: ({ location, source }) => {
        const target = location.current.dropTargets[0];

        if (!target) return;

        const parsedSource = Schemas.Data.safeParse(source.data);
        const parsedTarget = Schemas.Data.safeParse(target.data);
        const edge = extractClosestEdge(target.data);

        if (
          !parsedSource.success ||
          !parsedTarget.success ||
          !(parsedTarget.data.type === targetType) ||
          !edge
        )
          return;

        onDrop({
          edge: edge as E[number],
          source: {
            data: parsedSource.data.data as SD,
            type: parsedSource.data.type as ST,
          },
          target: {
            data: parsedTarget.data.data as TD,
            type: parsedTarget.data.type as TT,
          },
        });
      },
    });
  }, [onDrop, sourceType, targetType]);
}
