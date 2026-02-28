import type {
  UploadMediaFormOnSubmit,
  UploadMediaFormSubmitInput,
} from "./components/upload-media-form";

export type UploadMediaWidgetUploadInput = UploadMediaFormSubmitInput;

export type UploadMediaWidgetInput = {
  onBack?: () => void;
  onUpload: UploadMediaFormOnSubmit;
};
