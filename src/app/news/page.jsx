"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Title from "@/components/Title/Title";
import SearchField from "@/components/SearchField/SearchField";
import NewsList from "@/components/NewsList/NewsList";
import Pagination from "@/components/Pagination/Pagination";
import { fetchNews } from "@/redux/newsSlice";
import styles from "./News.module.css"; // Import the CSS module

const News = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNews({}));
  }, [dispatch]);

  return (
    <div>
      <div className={styles.header}>
        <Title text="News" />
        <SearchField />
      </div>
      <NewsList />
      <Pagination />
    </div>
  );
};

export default News;
