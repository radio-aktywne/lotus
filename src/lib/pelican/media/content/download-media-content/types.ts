export type DownloadMediaContentInput = {
  id: string;
};

export type DownloadMediaContentOutput = {
  data: ReadableStream<Uint8Array>;
  etag: string;
  length: number;
  modified: string;
  type: string;
};
