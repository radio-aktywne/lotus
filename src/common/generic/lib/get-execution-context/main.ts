import type {
  GetExecutionContextInput,
  GetExecutionContextOutput,
} from "./types";

export function getExecutionContext({}: GetExecutionContextInput = {}): GetExecutionContextOutput {
  return {
    context: {
      runtime: typeof window === "undefined" ? "server" : "client",
    },
  };
}
