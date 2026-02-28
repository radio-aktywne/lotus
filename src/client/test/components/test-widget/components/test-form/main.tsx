import { msg } from "@lingui/core/macro";
import { Button, TextInput } from "@mantine/core";

import type { TestFormInput } from "./types";

import { useForm } from "../../../../../../isomorphic/core/hooks/use-form";
import { useLocalization } from "../../../../../../isomorphic/localization/hooks/use-localization";
import { Schemas } from "./schemas";

export function TestForm({ initialValues, onError, onSubmit }: TestFormInput) {
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
        key={form.key("value")}
        placeholder={localization.localize(
          msg({ message: "Enter some value" }),
        )}
        {...form.getInputProps("value")}
      />
      <Button loading={submitting} type="submit">
        {localization.localize(msg({ message: "Submit" }))}
      </Button>
    </form>
  );
}
