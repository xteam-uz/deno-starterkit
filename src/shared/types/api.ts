export type ApiSuccess<T> = {
  success: true;
  data: T;
  meta?: Record<string, unknown>;
  requestId: string;
};

export type ApiError = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
  requestId: string;
};

export type Pagination = {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
};

export type QueryOptions = {
  page: number;
  perPage: number;
  sort?: string;
  direction?: "asc" | "desc";
  search?: string;
  filters: Record<string, string>;
};
