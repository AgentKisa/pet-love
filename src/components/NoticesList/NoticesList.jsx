// components/NoticesList.js
import React from "react";
import styles from "./NoticesList.module.css";
import NoticesItem from "../NoticesItem/NoticesItem";

const NoticesList = ({ notices }) => {
  return (
    <div className={styles.listContainer}>
      <NoticesItem notices={notices} />
    </div>
  );
};

export default NoticesList;
