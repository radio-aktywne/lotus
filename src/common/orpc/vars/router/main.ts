import { orpcContractBuilder } from "../builder";
import { orpcContractProcedures } from "../procedures";

export const orpcContractRouter = orpcContractBuilder.router(
  orpcContractProcedures,
);
