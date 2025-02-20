"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NoticesItem from "../NoticesItem/NoticesItem";
import { fetchUserData } from "@/redux/userSlice";
import { removeFavorite } from "@/redux/noticesSlice";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import styles from "./MyNotices.module.css";

const MyNotices = () => {
  const dispatch = useDispatch();
  const { userData, status, error } = useSelector((state) => state.user);

  const [activeTab, setActiveTab] = useState("favorites");

  useEffect(() => {
    if (!userData || Object.keys(userData).length === 0) {
      dispatch(fetchUserData());
    }
  }, [dispatch, userData]);

  const favorites = userData?.noticesFavorites || [];
  const viewed = userData?.noticesViewed || [];

  const handleRemoveFavorite = (id) => {
    dispatch(removeFavorite({ id, token: userData?.token })).then(() => {
      dispatch(fetchUserData());
    });
  };

  const noticesToRender = activeTab === "favorites" ? favorites : viewed;

  const renderNotices = () => {
    if (activeTab === "favorites" && noticesToRender.length === 0) {
      return (
        <p className={styles.noFavorites}>
          Oops, looks like there aren't any furries on our adorable page yet. Do
          not worry! View your pets on the "find your favorite pet" page and add
          them to your favorites.
        </p>
      );
    }
    return (
      <div className={styles.listContainer}>
        <NoticesItem
          notices={noticesToRender}
          gap="24px"
          padding="14px"
          flex-wrap="nowrap"
          justifyContent="start"
          width={{ item: "320px", image: "292px" }}
          isFavoriteTab={activeTab === "favorites"}
          onRemoveFavorite={
            activeTab === "favorites" ? handleRemoveFavorite : undefined
          }
          showActionButton={activeTab === "favorites"} // Передаем проп
        />
      </div>
    );
  };

  const containerClass =
    noticesToRender.length > 4
      ? `${styles.noticesList} ${styles.scrollContainer}`
      : styles.noticesList;

  return (
    <div className={styles.myNoticesContainer}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${
            activeTab === "favorites" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("favorites")}
        >
          My favorite pets
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "viewed" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("viewed")}
        >
          Viewed
        </button>
      </div>
      {noticesToRender.length > 4 ? (
        <SimpleBar className={containerClass}>
          {status === "loading" ? (
            <p>Loading...</p>
          ) : error ? (
            <p className={styles.error}>Error: {error.message}</p>
          ) : (
            renderNotices()
          )}
        </SimpleBar>
      ) : (
        <div className={containerClass}>
          {status === "loading" ? (
            <p>Loading...</p>
          ) : error ? (
            <p className={styles.error}>Error: {error.message}</p>
          ) : (
            renderNotices()
          )}
        </div>
      )}
    </div>
  );
};

export default MyNotices;
