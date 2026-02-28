import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { useEffect, useMemo, useRef, useState } from "react";

import type { UseDragInput, UseDragOutput, UseDragState } from "./types";

export function useDrag<T extends HTMLElement>({
  data,
  type,
}: UseDragInput): UseDragOutput<T> {
  const [state, setState] = useState<UseDragState>({ dragging: false });
  const [preview, setPreview] = useState<HTMLElement>();

  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    return draggable({
      element: ref.current,
      getInitialData: () => ({ data: data, type: type }),
      onDragStart: () => setState({ dragging: true }),
      onDrop: () => setState({ dragging: false }),
      onGenerateDragPreview: ({ nativeSetDragImage }) => {
        setCustomNativeDragPreview({
          nativeSetDragImage: nativeSetDragImage,
          render: ({ container }) => {
            setPreview(container);
            return () => setPreview(undefined);
          },
        });
      },
    });
  }, [data, type]);

  return useMemo(
    () => ({ preview: preview, ref: ref, state: state }),
    [preview, ref, state],
  );
}
