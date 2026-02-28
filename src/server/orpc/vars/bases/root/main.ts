import { orpcServerImplementer } from "../../implementer";
import { zodMiddleware } from "../../middleware/zod";

export const orpcServerRootBase = orpcServerImplementer.use(zodMiddleware);
