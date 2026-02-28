import { cache } from "react";

import { createQueryClient } from "../../../../common/query/lib/create-query-client";

export const cachedCreateQueryClient = cache(() => createQueryClient());
