"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import styles from "./UserBar.module.css";

const UserBar = ({ isHomePage }) => {
  const userData = useSelector((state) => state.user.userData);

  if (!userData) {
    return null;
  }

  const avatar = userData?.avatar || null;
  const userName = userData?.name || "User";

  return (
    <div className={styles.userBar}>
      <Link href="/profile" className={styles.profileLink}>
        {avatar ? (
          <img src={avatar} alt={userName} className={styles.avatar} />
        ) : (
          <div className={styles.userIcon}>
            <svg className={styles.icon2}>
              <use href="/sprite.svg#icon-user-yellow"></use>
            </svg>
          </div>
        )}
        <span
          className={`${styles.userName} ${
            isHomePage ? styles.homeUserName : ""
          }`}
        >
          {userName}
        </span>
      </Link>
    </div>
  );
};

export default UserBar;
