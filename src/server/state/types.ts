import "server-only";

import type { Sdk as ICanHazDadJokeSDK } from "../../common/apis/icanhazdadjoke/sdk";
import type { Sdk as PelicanSDK } from "../../common/apis/pelican/sdk";
import type { Config } from "../config/types";

export type APIs = {
  icanhazdadjoke: ICanHazDadJokeSDK;
  pelican: PelicanSDK;
};

export type State = {
  apis: APIs;
  config: Config;
};
