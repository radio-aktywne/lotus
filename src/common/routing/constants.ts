import { msg } from "@lingui/core/macro";

export const commonRoutingConstants = {
  routes: {
    "/": msg({ message: "/" }),
    "/playlists": msg({ message: "/playlists" }),
    "/playlists/[id]": msg({ message: "/playlists/[id]" }),
    "/playlists/[id]/edit": msg({ message: "/playlists/[id]/edit" }),
    "/playlists/new": msg({ message: "/playlists/new" }),
  },
} as const;
