import type {
  ErrorFromErrorMap,
  InferContractRouterErrorMap,
  InferContractRouterInputs,
  InferContractRouterOutputs,
} from "@orpc/contract";

import type { ExcludeExact } from "../../../generic/types";
import type { orpcContractRouter } from "../../vars/router";

export type ORPCInputs = InferContractRouterInputs<typeof orpcContractRouter>;

export type ORPCOutputs = InferContractRouterOutputs<typeof orpcContractRouter>;

export type ORPCDefinedError = ExcludeExact<
  ErrorFromErrorMap<InferContractRouterErrorMap<typeof orpcContractRouter>>,
  Error
>;
