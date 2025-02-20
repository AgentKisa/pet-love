"use client";

import UserBar from "../UserBar/UserBar";
import LogOutBtn from "../LogOutBtn/LogOutBtn";
import styles from "./UserNav.module.css";

const UserNav = ({ isHomePage }) => {
  return (
    <div className={styles.userNav}>
      <LogOutBtn />
      <UserBar isHomePage={isHomePage} />
    </div>
  );
};

export default UserNav;
