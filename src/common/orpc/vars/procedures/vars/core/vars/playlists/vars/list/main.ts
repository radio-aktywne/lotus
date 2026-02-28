import { orpcContractRootBase } from "../../../../../../../bases/root";
import { Schemas } from "./schemas";

export const list = orpcContractRootBase
  .input(Schemas.Input)
  .output(Schemas.Output);
