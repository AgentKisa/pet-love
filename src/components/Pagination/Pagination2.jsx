import React from "react";
import styles from "./Pagination2.module.css";

const Pagination = ({ page, totalPages, onPageChange }) => {
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    onPageChange(newPage);
  };

  const renderPageNumbers = () => {
    // Например, фиксированное окно из 3 страниц
    let startPage, endPage;
    const windowSize = 3;

    if (totalPages <= windowSize) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (page <= 2) {
        startPage = 1;
        endPage = 3;
      } else if (page >= totalPages - 1) {
        startPage = totalPages - 2;
        endPage = totalPages;
      } else {
        startPage = page - 1;
        endPage = page + 1;
      }
    }

    const pageNumbers = [];
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
          disabled={page >= totalPages}
          className={`${styles.pageButton} ${styles.arrow}`}
        >
          {">"}
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={page >= totalPages}
          className={`${styles.pageButton} ${styles.arrow}`}
        >
          {">>"}
        </button>
      </div>
    )
  );
};

export default Pagination;
