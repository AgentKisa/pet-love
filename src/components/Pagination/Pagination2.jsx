import React from "react";
import styles from "./Pagination2.module.css";

const Pagination = ({ page, totalPages, onPageChange }) => {
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage >= totalPages) return;
    onPageChange(newPage);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const windowSize = 3;

    let startPage, endPage;
    if (totalPages <= windowSize) {
      startPage = 1;
      endPage = totalPages - 1;
    } else {
      if (page <= 2) {
        startPage = 1;
        endPage = 3;
      } else if (page >= totalPages - 2) {
        startPage = totalPages - 3;
        endPage = totalPages - 1;
      } else {
        startPage = page - 1;
        endPage = page + 1;
      }
    }

    if (startPage > 1 && page < 4) {
      pageNumbers.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={styles.pageButton}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pageNumbers.push(
          <span key="start-ellipsis" className={styles.dots}>
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`${styles.pageButton} ${
            i === page ? styles.activePage : ""
          }`}
          disabled={i === page}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages - 1) {
      pageNumbers.push(
        <span key="end-ellipsis" className={styles.dots}>
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
          className={`${styles.pageButton} ${styles.arrow}`}
        >
          {"<<"}
        </button>
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
          className={`${styles.pageButton} ${styles.arrow}`}
        >
          {"<"}
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages - 1}
          className={`${styles.pageButton} ${styles.arrow}`}
        >
          {">"}
        </button>
        <button
          onClick={() => handlePageChange(totalPages - 1)}
          disabled={page >= totalPages - 1}
          className={`${styles.pageButton} ${styles.arrow}`}
        >
          {">>"}
        </button>
      </div>
    )
  );
};

export default Pagination;
