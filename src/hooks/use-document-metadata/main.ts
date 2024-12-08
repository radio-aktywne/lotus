import "client-only";

import { useElementAttribute } from "../use-element-attribute";
import { useElementText } from "../use-element-text";
import { UseDocumentMetadataInput } from "./types";

export function useDocumentMetadata({
  description,
  language,
  title,
}: UseDocumentMetadataInput): void {
  useElementAttribute({
    attribute: "content",
    selector: "meta[name='description']",
    value: description,
  });

  useElementAttribute({
    attribute: "lang",
    selector: "html",
    value: language,
  });

  useElementText({
    selector: "title",
    text: title,
  });
}
