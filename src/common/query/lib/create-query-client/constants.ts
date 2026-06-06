export const constants = {
  retries: 3,
  times: {
    refetch: 30 * 1000,
    stale: 30 * 1000,
  },
} as const;
