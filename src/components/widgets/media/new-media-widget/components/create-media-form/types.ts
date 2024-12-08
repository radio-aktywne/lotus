import {
  UseMediaFormValidators,
  UseMediaFormValues,
} from "../../../../../../hooks/forms/use-media-form";

export type CreateMediaFormData = UseMediaFormValues;

export type CreateMediaFormErrors = {
  [K in keyof UseMediaFormValues]?: string;
};

export type CreateMediaFormValidators = UseMediaFormValidators;

export type CreateMediaFormInput = {
  onCreate?: (
    data: CreateMediaFormData,
  ) => Promise<CreateMediaFormErrors | null | undefined>;
  validate?: CreateMediaFormValidators;
};
