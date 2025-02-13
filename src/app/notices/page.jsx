"use client";
import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotices, setPage } from "@/redux/noticesSlice";
import styles from "./Notices.module.css";
import Pagination from "@/components/Pagination/Pagination2";
import NoticesFilters from "@/components/NoticesFilters/NoticesFilters";
import NoticesList from "@/components/NoticesList/NoticesList";
import Title from "@/components/Title/Title";

const NoticesPage = () => {
  const dispatch = useDispatch();
  const { notices, page, totalPages, filters, loading, error } = useSelector(
    (state) => state.notices
  );

  // Вызываем fetchNotices при изменении фильтров
  const handleFilterChange = useCallback(
    (newFilters) => {
      dispatch(fetchNotices({ ...newFilters, page: 1, limit: 6 }));
    },
    [dispatch]
  );

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
    dispatch(fetchNotices({ ...filters, page: newPage, limit: 6 }));
  };

  // При первичном монтировании получаем начальные объявления
  useEffect(() => {
    dispatch(fetchNotices({ page: 1, limit: 6 }));
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <Title text="Find your favorite pet" className={styles.title} />
      <NoticesFilters onFilterChange={handleFilterChange} />
      {loading ? (
        <p>Loading notices...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <NoticesList notices={notices} />
      )}
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default NoticesPage;
