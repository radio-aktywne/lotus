type AnyUrlInput = {
  fragment?: null | string;
  query?: null | { [key: string]: boolean | number | string };
};

type AbsoluteUrlInput = AnyUrlInput & {
  host: string;
  path?: null | string;
  port?: null | number;
  scheme: string;
};

type RelativeUrlInput = AnyUrlInput & {
  host?: never;
  path: string;
  port?: never;
  scheme?: never;
};

export type CreateUrlInput = AbsoluteUrlInput | RelativeUrlInput;

export type CreateUrlOutput = {
  url: string;
};
