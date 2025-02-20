import Link from "next/link";
import styles from "./Logo.module.css";

const Logo = ({ isHomePage }) => {
  return (
    <Link
      href="/home"
      className={`${styles.logo} ${isHomePage ? styles.homeLogo : ""}`}
    >
      <div>
        {isHomePage ? (
          <svg className={styles.icon2}>
            <use href="/sprite.svg#icon-logo-2"></use>
          </svg>
        ) : (
          <svg className={styles.icon2}>
            <use href="/sprite.svg#icon-logo-1"></use>
          </svg>
        )}
      </div>
    </Link>
  );
};

export default Logo;
