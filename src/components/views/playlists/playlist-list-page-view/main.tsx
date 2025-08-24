import { redirect } from "next/navigation";

import { listPlaylists } from "../../../../lib/pelican/playlists/list-playlists";
import { PlaylistListWidget } from "../../../widgets/playlists/playlist-list-widget";
import { PlaylistListPageViewInput } from "./types";

export async function PlaylistListPageView({
  page,
  query,
}: PlaylistListPageViewInput) {
  const limit = 10;
  const props = {
    limit: limit,
    offset: page ? (page - 1) * limit : undefined,
    order: JSON.stringify({ name: "asc" }),
    where: query
      ? JSON.stringify({ name: { contains: query, mode: "insensitive" } })
      : undefined,
  };
  const { playlists } = await listPlaylists(props);

  const pages = Math.ceil(playlists.count / limit);
  if (page && page > pages) {
    const newPage = Math.max(1, pages);
    const params = new URLSearchParams();

    if (newPage > 1) params.append("page", newPage.toString());
    if (query) params.append("query", query);

    const path = params.toString()
      ? `/playlists?${params.toString()}`
      : `/playlists`;
    redirect(path);
  }

  return <PlaylistListWidget playlists={playlists} {...props} />;
}
