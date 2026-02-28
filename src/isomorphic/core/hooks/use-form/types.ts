import type { MessageDescriptor } from "@lingui/core";
import type { UseFormReturnType as UseMantineFormReturnType } from "@mantine/form";
import type { SubmitEvent } from "react";
import type { Paths } from "type-fest";
import type * as z from "zod";

export type ZodObject = z.core.$ZodObject;

export type UseFormValues<SchemaType extends ZodObject> = z.infer<SchemaType>;

export type UseFormErrors<SchemaType extends ZodObject> = {
  [path in Paths<UseFormValues<SchemaType>>]?: MessageDescriptor | string;
};

export type UseFormSubmitErrorOutput<SchemaType extends ZodObject> = {
  errors: UseFormErrors<SchemaType>;
  values?: never;
};

export type UseFormSubmitSuccessOutput<SchemaType extends ZodObject> = {
  errors?: never;
  values: UseFormValues<SchemaType>;
};

export type UseFormSubmitOutput<SchemaType extends ZodObject> =
  | undefined
  | UseFormSubmitErrorOutput<SchemaType>
  | UseFormSubmitSuccessOutput<SchemaType>
  | void;

export type UseFormInitialValues<SchemaType extends ZodObject> =
  UseFormValues<SchemaType>;

export type UseFormOnError = (() => void) | undefined;

export type UseFormSubmitInput<SchemaType extends ZodObject> = {
  values: UseFormValues<SchemaType>;
};

export type UseFormOnSubmit<SchemaType extends ZodObject> =
  | ((
      input: UseFormSubmitInput<SchemaType>,
    ) => Promise<UseFormSubmitOutput<SchemaType>>)
  | undefined;

export type UseFormSchema<SchemaType extends ZodObject> = SchemaType;

export type UseFormForm<SchemaType extends ZodObject> =
  UseMantineFormReturnType<UseFormValues<SchemaType>>;

export type UseFormHandleFormSubmitEvent =
  | SubmitEvent<HTMLFormElement>
  | undefined;

export type UseFormHandleFormSubmit = (
  event?: UseFormHandleFormSubmitEvent,
) => void;

export type UseFormSubmitting = boolean;

export type UseFormInput<SchemaType extends ZodObject> = {
  initialValues: UseFormInitialValues<SchemaType>;
  onError?: UseFormOnError;
  onSubmit?: UseFormOnSubmit<SchemaType>;
  schema: UseFormSchema<SchemaType>;
};

export type UseFormOutput<SchemaType extends ZodObject> = {
  form: UseFormForm<SchemaType>;
  handleFormSubmit: UseFormHandleFormSubmit;
  submitting: UseFormSubmitting;
};
