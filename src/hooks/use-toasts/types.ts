export type Toast = (message: string) => void;

export type UseToastsInput = {
  [key: string]: never;
};

export type UseToastsOutput = {
  error: Toast;
  info: Toast;
  success: Toast;
  warning: Toast;
};
