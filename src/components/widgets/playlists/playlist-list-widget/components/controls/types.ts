export type ControlsInput = {
  onPageChange?: (page: number) => void;
  onQueryChange?: (query: string) => void;
  page?: number;
  pages: number;
  query?: string;
};
