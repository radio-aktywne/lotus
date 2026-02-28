import { orpcContractRootBase } from "../../../../../../../bases/root";
import { Schemas } from "./schemas";

export const create = orpcContractRootBase
  .input(Schemas.Input)
  .output(Schemas.Output);
