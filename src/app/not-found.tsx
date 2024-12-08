import { RootNotFoundMetadata } from "../components/metadata/root/root-not-found-metadata";
import { RootNotFoundView } from "../components/views/root/root-not-found-view";
import { RootNotFoundInput } from "./types";

export default function RootNotFound({}: RootNotFoundInput) {
  return (
    <>
      <RootNotFoundMetadata />
      <RootNotFoundView />
    </>
  );
}
