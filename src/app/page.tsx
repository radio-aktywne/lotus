import { redirect } from "next/navigation";

import { RootPageInput } from "./types";

export default function RootPage({}: RootPageInput) {
  redirect("/playlists");
}
