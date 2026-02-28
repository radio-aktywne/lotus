import { orpcServerImplementer } from "../implementer";
import { orpcProcedures } from "../procedures";

export const orpcServerRouter = orpcServerImplementer.router(orpcProcedures);
