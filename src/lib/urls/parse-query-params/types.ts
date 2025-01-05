import { z } from "zod";

export type ParseQueryParamsInput<T extends z.ZodTypeAny> = {
  params: URLSearchParams;
  schema: T;
};

export type ParseQueryParamsSuccessOutput<T extends z.ZodTypeAny> = {
  data: z.infer<T>;
  error?: never;
};

export type ParseQueryParamsErrorOutput<T extends z.ZodTypeAny> = {
  data?: never;
  error: z.ZodError<z.infer<T>>;
};

export type ParseQueryParamsOutput<T extends z.ZodTypeAny> =
  | ParseQueryParamsErrorOutput<T>
  | ParseQueryParamsSuccessOutput<T>;
