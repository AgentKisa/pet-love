import Link from "next/link";
import styles from "./AuthNav.module.css";

const AuthNav = ({ isHomePage }) => {
  return (
    <div
      className={`${styles.authNav} ${isHomePage ? styles.homeAuthNav : ""}`}
    >
      <Link
        href="/register"
        className={`${styles.navLink} ${isHomePage ? styles.homeAuthNav : ""}`}
      >
        Registration
      </Link>
      <Link
        href="/login"
        className={`${styles.navLink} ${isHomePage ? styles.homeAuthNav : ""}`}
      >
        Log in
      </Link>
    </div>
  );
};

export default AuthNav;
