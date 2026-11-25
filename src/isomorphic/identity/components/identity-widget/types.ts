type Url = {
  host: string;
  path?: null | string;
  port?: null | number;
  scheme: string;
};

type Urls = {
  base: string;
  orchid: Url;
  sunflower: Url;
};

export type IdentityWidgetInput = {
  urls: Urls;
};
