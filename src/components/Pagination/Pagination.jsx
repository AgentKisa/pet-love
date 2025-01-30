import { fetchNews } from "@/redux/newsSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Pagination.module.css";

const Pagination = () => {
  const dispatch = useDispatch();
  const { page, totalPages } = useSelector((state) => state.news);

  const handlePageChange = (newPage) => {
    dispatch(fetchNews({ page: newPage }));
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 3; // Число отображаемых страниц
    let startPage = Math.max(1, page - 1);
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={i === page}
          className={styles.pageButton}
        >
          {i}
        </button>
      );
    }

    if (startPage > 1) {
      pageNumbers.unshift(
        <span key="start-dots" className={styles.dots}>
          ...
        </span>
      );
    }
    if (endPage < totalPages) {
      pageNumbers.push(
        <span key="end-dots" className={styles.dots}>
          ...
        </span>
      );
    }

    return pageNumbers;
  };

  return (
    totalPages > 1 && (
      <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(1)}
          disabled={page <= 1}
          className={styles.pageButton}
        >
          {"<<"}
        </button>
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
          className={styles.pageButton}
        >
          {"<"}
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages}
          className={styles.pageButton}
        >
          {">"}
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={page >= totalPages}
          className={styles.pageButton}
        >
          {">>"}
        </button>
      </div>
    )
  );
};

export default Pagination;
