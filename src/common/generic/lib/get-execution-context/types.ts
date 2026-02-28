export type Runtime = "client" | "server";

export type ExecutionContext = {
  runtime: Runtime;
};

export type GetExecutionContextInput = object;

export type GetExecutionContextOutput = {
  context: ExecutionContext;
};
