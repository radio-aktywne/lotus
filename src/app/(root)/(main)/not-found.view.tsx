import { msg } from "@lingui/core/macro";

import type { NotFoundViewInput } from "../../types";

import { NotFoundWidget } from "../../../isomorphic/core/components/generic/not-found-widget";

export async function MainNotFoundView({}: NotFoundViewInput) {
  return <NotFoundWidget message={msg({ message: "Page not found" })} />;
}
