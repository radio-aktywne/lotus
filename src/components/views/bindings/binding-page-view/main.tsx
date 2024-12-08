import { notFound } from "next/navigation";

import {
  BindingNotFoundError,
  getBinding,
} from "../../../../lib/pelican/bindings/get-binding";
import { BindingWidget } from "../../../widgets/bindings/binding-widget";
import { BindingPageViewInput } from "./types";

export async function BindingPageView({ id }: BindingPageViewInput) {
  try {
    const { binding } = await getBinding({ id: id });

    return <BindingWidget binding={binding} />;
  } catch (error) {
    if (error instanceof BindingNotFoundError) notFound();
    throw error;
  }
}
