export type RefreshTokensInput = {
  refreshToken: string;
};

export type RefreshTokensOutput = {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  scope: string;
  tokenType: string;
};
