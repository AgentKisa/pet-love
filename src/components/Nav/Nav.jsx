import Link from "next/link";
import styles from "./Nav.module.css";

const Nav = ({ isHomePage }) => {
  return (
    <nav className={`${styles.nav} ${isHomePage ? styles.homeNav : ""}`}>
      <Link
        href="/news"
        className={`${styles.navLink} ${isHomePage ? styles.homeNavLink : ""}`}
      >
        News
      </Link>
      <Link
        href="/notices"
        className={`${styles.navLink} ${isHomePage ? styles.homeNavLink : ""}`}
      >
        Find pet
      </Link>
      <Link
        href="/friends"
        className={`${styles.navLink} ${isHomePage ? styles.homeNavLink : ""}`}
      >
        Our friends
      </Link>
    </nav>
  );
};

export default Nav;
