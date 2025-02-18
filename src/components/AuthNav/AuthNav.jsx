import Link from "next/link";
import styles from "./AuthNav.module.css";

const AuthNav = ({ isHomePage }) => {
  return (
    <div
      className={`${styles.authNav} ${isHomePage ? styles.homeAuthNav : ""}`}
    >
      <Link
        href="/login"
        className={`${styles.navLinkLogin} ${
          isHomePage ? styles.homeAuthNavLogin : ""
        }`}
      >
        Log in
      </Link>
      <Link
        href="/register"
        className={`${styles.navLinkRegistr} ${
          isHomePage ? styles.homeAuthNavRegistr : ""
        }`}
      >
        Registration
      </Link>
    </div>
  );
};

export default AuthNav;
