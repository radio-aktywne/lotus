import { BindingNotFoundMetadata } from "../../../../components/metadata/bindings/binding/binding-not-found-metadata";
import { BindingNotFoundView } from "../../../../components/views/bindings/binding/binding-not-found-view";
import { BindingNotFoundInput } from "./types";

export const dynamic = "force-dynamic";

export default function BindingNotFound({}: BindingNotFoundInput) {
  return (
    <>
      <BindingNotFoundMetadata />
      <BindingNotFoundView />
    </>
  );
}
