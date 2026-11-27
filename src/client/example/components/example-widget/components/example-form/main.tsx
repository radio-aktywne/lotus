import { msg } from "@lingui/core/macro";
import { Button, TextInput } from "@mantine/core";
import { isString } from "es-toolkit/predicate";

import type { ExampleFormInput } from "./types";

import { useForm } from "../../../../../../isomorphic/core/hooks/use-form";
import { useLocalization } from "../../../../../../isomorphic/localization/hooks/use-localization";
import { Schemas } from "./schemas";

export function ExampleForm({
  initialValues,
  onError,
  onSubmit,
}: ExampleFormInput) {
  const { localization } = useLocalization();

  const { form, handleFormSubmit, submitting } = useForm({
    initialValues: initialValues,
    inputSchema: Schemas.Input,
    onError: onError,
    onSubmit: onSubmit,
    outputSchema: Schemas.Output,
  });

  return (
    <form onSubmit={handleFormSubmit} style={{ display: "contents" }}>
      <TextInput
        errorProps={{
          title: [form.getInputProps("value").error].find(isString),
        }}
        key={form.key("value")}
        placeholder={localization.localize(
          msg({ message: "Enter some value" }),
        )}
        styles={{ error: { position: "absolute" } }}
        {...form.getInputProps("value")}
      />
      <Button loading={submitting} type="submit">
        {localization.localize(msg({ message: "Submit" }))}
      </Button>
    </form>
  );
}
