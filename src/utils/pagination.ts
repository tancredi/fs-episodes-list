import type { PaginationData } from "src/types/pagination";

export const paginate = <T>(
  entries: T[],
  page: number,
  pageSize: number
): { entries: T[]; pagination: PaginationData } => ({
  entries: entries.slice(page * pageSize, page * pageSize + pageSize),
  pagination: { page, totalPages: Math.ceil(entries.length / pageSize) },
});
