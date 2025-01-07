export type LogInInput = {
  callback?: string;
  prompt?: "account" | "consent" | "login" | "none";
};

export type LogInSuccessOutput = {
  error?: never;
  url: string;
};

export type LogInErrorOutput = {
  error: string;
  url?: never;
};

export type LogInOutput = LogInErrorOutput | LogInSuccessOutput;
