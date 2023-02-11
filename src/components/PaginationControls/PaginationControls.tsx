import { FunctionComponent } from "react";
import type { PaginationData } from "src/types/pagination";
import styles from "./PaginationControls.module.css";

interface Props {
  pagination: PaginationData;
  baseUrl: string;
}

export const PaginationControls: FunctionComponent<Props> = ({
  pagination: { page, totalPages },
  baseUrl,
}) => (
  <div className={styles.pagination}>
    {page > 0 && <a href={`${baseUrl}?page=${page - 1}`}>&laquo; Previous</a>}

    <div className={styles.current}>
      Page {page + 1} of {totalPages}
    </div>

    {page < totalPages - 1 && (
      <a href={`${baseUrl}?page=${page + 1}`}>Next &raquo;</a>
    )}
  </div>
);
