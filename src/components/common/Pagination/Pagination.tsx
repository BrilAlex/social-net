import {FC, useState} from "react";
import s from "./Pagination.module.css";
import cn from "classnames";

type PaginationPropsType = {
  totalItemsCount: number
  pageSize: number
  portionSize?: number
  currentPage: number
  setCurrentPage: (pageNumber: number) => void
};

export const Pagination: FC<PaginationPropsType> = (
  {
    totalItemsCount,
    pageSize,
    currentPage,
    setCurrentPage,
    portionSize = 10
  }
) => {
  const pagesCount = Math.ceil(totalItemsCount / pageSize);
  let pages: Array<number> = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(Math.ceil(currentPage / portionSize));
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

  const prevButtonHandler = () => {
    setPortionNumber(portionNumber - 1);
  };

  const nextButtonHandler = () => {
    setPortionNumber(portionNumber + 1);
  };

  return (
    <div className={s.pagination}>
      {portionNumber > 1 && <button onClick={prevButtonHandler}>Prev</button>}
      {
        pages
          .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
          .map((p, i) =>
            <span
              key={"page-" + i}
              className={cn(s.page, {[s.selected]: p === currentPage})}
              onClick={() => setCurrentPage(p)}
            >
              {p}
            </span>
          )
      }
      {portionNumber < portionCount && <button onClick={nextButtonHandler}>Next</button>}
    </div>
  );
};