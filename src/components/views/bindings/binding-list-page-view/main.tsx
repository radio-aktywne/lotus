import { listBindings } from "../../../../lib/pelican/bindings/list-bindings";
import { BindingListWidget } from "../../../widgets/bindings/binding-list-widget";
import { BindingListPageViewInput } from "./types";

export async function BindingListPageView({}: BindingListPageViewInput) {
  const { bindings } = await listBindings();

  return <BindingListWidget bindings={bindings} />;
}
