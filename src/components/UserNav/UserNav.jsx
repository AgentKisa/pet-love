"use client";

import UserBar from "../UserBar/UserBar";
import LogOutBtn from "../LogOutBtn/LogOutBtn";
import styles from "./UserNav.module.css";

const UserNav = () => {
  return (
    <div className={styles.userNav}>
      <LogOutBtn />
      <UserBar />
    </div>
  );
};

export default UserNav;
