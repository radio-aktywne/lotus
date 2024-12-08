import { BindingNotFoundMetadata } from "../../../components/metadata/bindings/binding-not-found-metadata";
import { BindingNotFoundView } from "../../../components/views/bindings/binding-not-found-view";
import { BindingNotFoundInput } from "./types";

export default function BindingNotFound({}: BindingNotFoundInput) {
  return (
    <>
      <BindingNotFoundMetadata />
      <BindingNotFoundView />
    </>
  );
}
