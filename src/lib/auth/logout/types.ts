export type LogOutInput = {
  callback?: string;
};

export type LogOutSuccessOutput = {
  error?: never;
  url: string;
};

export type LogOutErrorOutput = {
  error: string;
  url?: never;
};

export type LogOutOutput = LogOutErrorOutput | LogOutSuccessOutput;
