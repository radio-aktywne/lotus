import { orpcContractRootBase } from "../../../../../../../bases/root";
import { Schemas } from "./schemas";

export const update = orpcContractRootBase
  .input(Schemas.Input)
  .output(Schemas.Output);
