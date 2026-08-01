import type { MessageDescriptor } from "@lingui/core";
import type { UseFormReturnType as UseMantineFormReturnType } from "@mantine/form";
import type { SubmitEvent } from "react";
import type { HasRequiredKeys, Paths } from "type-fest";
import type * as z from "zod";

export type Values = { [key: string]: unknown };

export type UseFormInitialValues<InputValuesType extends Values> =
  InputValuesType;

export type UseFormInputSchema<
  RawValuesType extends Values,
  InputValuesType extends Values,
> = z.ZodType<InputValuesType, RawValuesType>;

export type UseFormErrorInput<InputValuesType extends Values> = {
  values: InputValuesType;
};

export type UseFormOnError<InputValuesType extends Values> =
  | ((input: UseFormErrorInput<InputValuesType>) => void)
  | undefined;

export type UseFormSubmitInput<OutputValuesType extends Values> = {
  values: OutputValuesType;
};

export type UseFormErrors<RawValuesType extends Values> = {
  [path in Paths<RawValuesType>]?: MessageDescriptor | string;
};

export type UseFormSubmitErrorOutput<RawValuesType extends Values> = {
  errors: UseFormErrors<RawValuesType>;
  values?: never;
};

export type UseFormSubmitSuccessOutput<InputValuesType extends Values> =
  void | {
    errors?: never;
    values: InputValuesType;
  };

export type UseFormSubmitOutput<
  RawValuesType extends Values,
  InputValuesType extends Values,
> =
  | undefined
  | UseFormSubmitErrorOutput<RawValuesType>
  | UseFormSubmitSuccessOutput<InputValuesType>
  | void;

export type UseFormOnSubmit<
  RawValuesType extends Values,
  InputValuesType extends Values,
  OutputValuesType extends Values,
> =
  | ((
      input: UseFormSubmitInput<OutputValuesType>,
    ) => Promise<UseFormSubmitOutput<RawValuesType, InputValuesType>>)
  | undefined;

export type UseFormValuesChangeInput<InputValuesType extends Values> = {
  current: InputValuesType;
  previous: InputValuesType;
};

export type UseFormOnValuesChange<InputValuesType extends Values> =
  | ((input: UseFormValuesChangeInput<InputValuesType>) => void)
  | undefined;

export type UseFormOutputSchema<
  RawValuesType extends Values,
  OutputValuesType extends Values,
> = z.ZodType<OutputValuesType, RawValuesType>;

export type UseFormForm<RawValuesType extends Values> =
  UseMantineFormReturnType<RawValuesType>;

export type UseFormHandleFormSubmitEvent =
  | SubmitEvent<HTMLFormElement>
  | undefined;

export type UseFormHandleFormSubmit = (
  event?: UseFormHandleFormSubmitEvent,
) => void;

export type UseFormSubmitting = boolean;

export type UseFormInput<
  RawValuesType extends Values,
  InputValuesType extends Values,
  OutputValuesType extends Values,
> = (HasRequiredKeys<InputValuesType> extends true
  ? { initialValues: UseFormInitialValues<InputValuesType> }
  : { initialValues?: UseFormInitialValues<InputValuesType> }) & {
  inputSchema: UseFormInputSchema<RawValuesType, InputValuesType>;
  onError?: UseFormOnError<InputValuesType>;
  onSubmit?: UseFormOnSubmit<RawValuesType, InputValuesType, OutputValuesType>;
  onValuesChange?: UseFormOnValuesChange<InputValuesType>;
  outputSchema: UseFormOutputSchema<RawValuesType, OutputValuesType>;
};

export type UseFormOutput<RawValuesType extends Values> = {
  form: UseFormForm<RawValuesType>;
  handleFormSubmit: UseFormHandleFormSubmit;
  submitting: UseFormSubmitting;
};
