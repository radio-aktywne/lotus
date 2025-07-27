import { generateKeyBetween } from "fractional-indexing";

import { PlaylistWidgetInput } from "./types";

export function findWithNeighbours<T>(
  array: T[],
  predicate: (item: T, index: number, array: T[]) => boolean,
) {
  for (const [index, item] of array.entries()) {
    if (predicate(item, index, array)) {
      return {
        item: item,
        next: array[index + 1],
        previous: array[index - 1],
      };
    }
  }

  return {};
}

export function getRankBetween(a: string | undefined, b: string | undefined) {
  return generateKeyBetween(a, b);
}

export function formatDisplayName(playlist: PlaylistWidgetInput["playlist"]) {
  return playlist.name;
}
