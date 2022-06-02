import {FC} from "react";
import styles from "./Pagination.module.css";

type PaginationPropsType = {
  totalUsersCount: number
  pageSize: number
  currentPage: number
  setCurrentPage: (pageNumber: number) => void
};

export const Pagination: FC<PaginationPropsType> = (
  {totalUsersCount, pageSize, currentPage, setCurrentPage}
) => {
  const pagesCount = Math.ceil(totalUsersCount / pageSize);
  let pages: Array<number> = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div className={styles.pagination}>
      {
        pages.map((p, i) =>
          <span
            key={"page-" + i}
            className={p === currentPage ? styles.selectedPage : ""}
            onClick={() => setCurrentPage(p)}
          >
            {p}
          </span>
        )
      }
    </div>
  );
};