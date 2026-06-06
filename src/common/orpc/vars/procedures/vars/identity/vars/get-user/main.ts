import { orpcContractRootBase } from "../../../../../bases/root";
import { Schemas } from "./schemas";

export const getUser = orpcContractRootBase
  .input(Schemas.Input)
  .output(Schemas.Output);
