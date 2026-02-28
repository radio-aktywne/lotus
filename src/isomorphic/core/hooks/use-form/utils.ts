import type { MessageDescriptor } from "@lingui/core";
import type { FormErrors } from "@mantine/form";

import { mapValues } from "es-toolkit/object";
import * as z from "zod";

import type { LocaleData } from "../../../../common/localization/types";
import type {
  UseFormErrors,
  UseFormInitialValues,
  UseFormSubmitOutput,
  ZodObject,
} from "./types";

export function validateValuesLocalized<SchemaType extends ZodObject>(
  schema: SchemaType,
  values: { [key: string]: unknown },
  localeData: LocaleData,
) {
  const { error } = z.safeParse(schema, values, {
    error: localeData.zod.localeError,
  });

  return Object.fromEntries(
    (error?.issues ?? []).map((issue) => [issue.path.join("."), issue.message]),
  );
}

export function transformErrors<SchemaType extends ZodObject>(
  errors: UseFormErrors<SchemaType>,
  localize: (message: MessageDescriptor) => string,
) {
  return mapValues(
    errors as { [key: string]: MessageDescriptor | string | undefined },
    (error) =>
      error === undefined || typeof error === "string"
        ? error
        : localize(error),
  );
}

export function handleSubmitResult<SchemaType extends ZodObject>(
  result: UseFormSubmitOutput<SchemaType>,
  reset: () => void,
  setErrors: (errors: FormErrors) => void,
  setInitialValues: (values: UseFormInitialValues<SchemaType>) => void,
  localize: (message: MessageDescriptor) => string,
) {
  if (result === undefined) {
    reset();
  } else if (result.errors !== undefined) {
    setErrors(transformErrors(result.errors, localize));
  } else if (result.values !== undefined) {
    setInitialValues(result.values);
    reset();
  } else {
    reset();
  }
}
