import {
  Edge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import "client-only";
import { useEffect } from "react";

import { dataSchema } from "./schemas";
import {
  UseDropMonitorData,
  UseDropMonitorDefaultEdges,
  UseDropMonitorInput,
} from "./types";

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
        const parsed = dataSchema.safeParse(source.data);

        if (!parsed.success) return false;

        return parsed.data.type === sourceType;
      },
      onDrop: ({ location, source }) => {
        const target = location.current.dropTargets[0];

        if (!target) return;

        const parsedSource = dataSchema.safeParse(source.data);
        const parsedTarget = dataSchema.safeParse(target.data);
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
