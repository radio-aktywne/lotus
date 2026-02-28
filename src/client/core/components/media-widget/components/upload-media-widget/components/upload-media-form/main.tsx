import { msg } from "@lingui/core/macro";
import { Button, FileInput, TextInput } from "@mantine/core";

import type { UploadMediaFormInput } from "./types";

import { useForm } from "../../../../../../../../isomorphic/core/hooks/use-form";
import { useLocalization } from "../../../../../../../../isomorphic/localization/hooks/use-localization";
import { Schemas } from "./schemas";

export function UploadMediaForm({
  initialValues,
  onError,
  onSubmit,
}: UploadMediaFormInput) {
  const { localization } = useLocalization();

  const { form, handleFormSubmit, submitting } = useForm({
    initialValues: initialValues,
    onError: onError,
    onSubmit: onSubmit,
    schema: Schemas.Values,
  });

  return (
    <form onSubmit={handleFormSubmit} style={{ display: "contents" }}>
      <TextInput
        key={form.key("name")}
        label={localization.localize(msg({ message: "Name" }))}
        placeholder={localization.localize(
          msg({ message: "Enter media name" }),
        )}
        required={true}
        {...form.getInputProps("name")}
      />
      <FileInput
        key={form.key("file")}
        label={localization.localize(msg({ message: "File" }))}
        placeholder={localization.localize(
          msg({ message: "Select media file" }),
        )}
        required={true}
        {...form.getInputProps("file")}
      />
      <Button
        loading={submitting}
        mt="auto"
        style={{ flexShrink: 0 }}
        type="submit"
      >
        {localization.localize(msg({ message: "Upload" }))}
      </Button>
    </form>
  );
}
