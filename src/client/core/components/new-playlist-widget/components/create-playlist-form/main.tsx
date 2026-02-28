import { msg } from "@lingui/core/macro";
import { Button, TextInput } from "@mantine/core";

import type { CreatePlaylistFormInput } from "./types";

import { useForm } from "../../../../../../isomorphic/core/hooks/use-form";
import { useLocalization } from "../../../../../../isomorphic/localization/hooks/use-localization";
import { Schemas } from "./schemas";

export function CreatePlaylistForm({
  initialValues,
  onError,
  onSubmit,
}: CreatePlaylistFormInput) {
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
          msg({ message: "Enter playlist name" }),
        )}
        required={true}
        {...form.getInputProps("name")}
      />
      <Button
        loading={submitting}
        mt="auto"
        style={{ flexShrink: 0 }}
        type="submit"
      >
        {localization.localize(msg({ message: "Create" }))}
      </Button>
    </form>
  );
}
