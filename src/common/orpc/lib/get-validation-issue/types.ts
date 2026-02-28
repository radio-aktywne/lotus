import type { ORPCDefinedError } from "../../types/inferred";

export type GetValidationIssueInput = {
  error: Extract<ORPCDefinedError, { code: "BAD_REQUEST" }>;
  path: string;
};

export type GetValidationIssueOutput = {
  message: string | undefined;
};
