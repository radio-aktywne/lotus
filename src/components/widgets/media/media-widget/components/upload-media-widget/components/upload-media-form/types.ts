import {
  UseUploadMediaFormValidators,
  UseUploadMediaFormValues,
} from "./hooks/forms/use-upload-media-form";

export type UploadMediaFormData = UseUploadMediaFormValues;

export type UploadMediaFormErrors = {
  [K in keyof UseUploadMediaFormValues]?: string;
};

export type UploadMediaFormValidators = UseUploadMediaFormValidators;

export type UploadMediaFormInput = {
  onUpload?: (
    data: UploadMediaFormData,
  ) => Promise<null | undefined | UploadMediaFormErrors>;
  validate?: UploadMediaFormValidators;
};
