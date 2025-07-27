import {
  attachClosestEdge,
  Edge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import "client-only";
import { useEffect, useMemo, useRef, useState } from "react";

import { dataSchema } from "./schemas";
import {
  UseDropDefaultEdges,
  UseDropInput,
  UseDropOutput,
  UseDropState,
} from "./types";

export function useDrop<
  R extends HTMLElement,
  E extends readonly Edge[] = UseDropDefaultEdges,
>({ accept, data, edges, type }: UseDropInput<E>): UseDropOutput<R, E> {
  const [state, setState] = useState<UseDropState<E>>({
    draggingOver: false,
  });

  const ref = useRef<R>(null);

  useEffect(() => {
    if (!ref.current) return;

    return dropTargetForElements({
      canDrop: ({ source }) => {
        const parsed = dataSchema.safeParse(source.data);

        if (!parsed.success) return false;

        if (accept) return accept(parsed.data.type, parsed.data.data);

        return true;
      },
      element: ref.current,
      getData: ({ element, input }) =>
        attachClosestEdge(
          {
            data: data,
            type: type,
          },
          {
            allowedEdges: [...(edges ?? ["top", "bottom"])],
            element: element,
            input: input,
          },
        ),
      onDrag: ({ self, source }) => {
        const parsed = dataSchema.safeParse(source.data);
        const edge = extractClosestEdge(self.data);

        if (!parsed.success || !edge) return;

        setState({
          draggingOver: true,
          edge: edge as E[number],
          source: {
            data: parsed.data.data,
            type: parsed.data.type,
          },
        });
      },
      onDragEnter: ({ self, source }) => {
        const parsed = dataSchema.safeParse(source.data);
        const edge = extractClosestEdge(self.data);

        if (!parsed.success || !edge) return;

        setState({
          draggingOver: true,
          edge: edge as E[number],
          source: {
            data: parsed.data.data,
            type: parsed.data.type,
          },
        });
      },
      onDragLeave: () => {
        setState({ draggingOver: false });
      },
      onDrop: () => {
        setState({ draggingOver: false });
      },
    });
  }, [accept, data, edges, type]);

  return useMemo(() => ({ ref: ref, state: state }), [ref, state]);
}
