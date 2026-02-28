import { loadConfig as zodConfigLoadConfig } from "zod-config";
import { envAdapter as zodConfigEnvAdapter } from "zod-config/env-adapter";

import type { LoadConfigInput, LoadConfigOutput } from "./types";

import { ConfigSchemas } from "../../schemas";
import { constants } from "./constants";

export async function loadConfig({}: LoadConfigInput = {}): Promise<LoadConfigOutput> {
  const config = await zodConfigLoadConfig({
    adapters: [
      zodConfigEnvAdapter({
        keyMatching: "lenient",
        nestingSeparator: constants.env.separator,
        transform: ({ key, value }) =>
          key.toLowerCase().startsWith(constants.env.prefix.toLowerCase())
            ? {
                key: key.slice(constants.env.prefix.length),
                value: value === "" ? null : value,
              }
            : false,
      }),
    ],
    schema: ConfigSchemas.Config,
  });

  return { config: config };
}
