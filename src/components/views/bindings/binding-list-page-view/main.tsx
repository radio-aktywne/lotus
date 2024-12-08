import { listBindings } from "../../../../lib/pelican/bindings/list-bindings";
import { BindingListWidget } from "../../../widgets/bindings/binding-list-widget";
import { perPage } from "./constants";
import { BindingListPageViewInput } from "./types";

export async function BindingListPageView({}: BindingListPageViewInput) {
  const { bindings } = await listBindings({ limit: perPage });

  return <BindingListWidget bindings={bindings} perPage={perPage} />;
}
