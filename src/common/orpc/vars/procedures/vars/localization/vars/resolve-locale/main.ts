import { orpcContractRootBase } from "../../../../../bases/root";
import { Schemas } from "./schemas";

export const resolveLocale = orpcContractRootBase
  .input(Schemas.Input)
  .output(Schemas.Output);
