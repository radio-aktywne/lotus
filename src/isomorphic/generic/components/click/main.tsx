"use client";

import { createPolymorphicComponent } from "@mantine/core";
import { useMergedRef } from "@mantine/hooks";
import { useEffect, useRef } from "react";

import type { BaseClickInput, ClickInput } from "./types";

export const Click = createPolymorphicComponent<"a", BaseClickInput>(
  function Click({ component: Component = "a", ref, ...input }: ClickInput) {
    const clicked = useRef(false);
    const innerRef = useRef<HTMLElement>(null);
    const mergedRef = useMergedRef(ref, innerRef);

    useEffect(() => {
      if (clicked.current || !innerRef.current) return;

      innerRef.current.click();
      clicked.current = true;
    }, []);

    return <Component ref={mergedRef} {...input} />;
  },
);
