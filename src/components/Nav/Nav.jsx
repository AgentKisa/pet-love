"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Nav.module.css";

const Nav = ({ isHomePage }) => {
  const pathname = usePathname();

  return (
    <nav className={`${styles.nav} ${isHomePage ? styles.homeNav : ""}`}>
      <Link
        href="/news"
        className={`${styles.navLink} ${isHomePage ? styles.homeNavLink : ""} ${
          pathname === "/news" ? styles.active : ""
        }`}
      >
        News
      </Link>
      <Link
        href="/notices"
        className={`${styles.navLink} ${isHomePage ? styles.homeNavLink : ""} ${
          pathname === "/notices" ? styles.active : ""
        }`}
      >
        Find pet
      </Link>
      <Link
        href="/friends"
        className={`${styles.navLink} ${isHomePage ? styles.homeNavLink : ""} ${
          pathname === "/friends" ? styles.active : ""
        }`}
      >
        Our friends
      </Link>
    </nav>
  );
};

export default Nav;
