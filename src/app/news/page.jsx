"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Title from "@/components/Title/Title";
import SearchField from "@/components/SearchField/SearchField2";
import NewsList from "@/components/NewsList/NewsList";
import Pagination from "@/components/Pagination/Pagination";
import { fetchNews } from "@/redux/newsSlice";
import styles from "./News.module.css";

const News = () => {
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNews({ keyword }));
  }, [dispatch, keyword]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title text="News" />
        <div className={styles.searchContainer}>
          <SearchField
            onChange={setKeyword}
            value={keyword}
            placeholder="Search"
          />
          {keyword && (
            <button
              type="button"
              onClick={() => setKeyword("")}
              className={styles.clearButton}
            >
              <svg className={styles.searchIcon}>
                <use href="/sprite.svg#icon-cross"></use>
              </svg>
            </button>
          )}
          <button type="submit" className={styles.searchButton}>
            <svg className={styles.searchIcon}>
              <use href="/sprite.svg#icon-search-1"></use>
            </svg>
          </button>
        </div>
      </div>
      <NewsList />
      <Pagination />
    </div>
  );
};

export default News;
