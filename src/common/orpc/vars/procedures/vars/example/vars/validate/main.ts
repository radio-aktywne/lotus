import { orpcContractRootBase } from "../../../../../bases/root";
import { Schemas } from "./schemas";

export const validate = orpcContractRootBase
  .input(Schemas.Input)
  .output(Schemas.Output);
