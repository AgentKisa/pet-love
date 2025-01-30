import Link from "next/link";
import styles from "./Logo.module.css";

const Logo = ({ isHomePage }) => {
  return (
    <Link
      href="/"
      className={`${styles.logo} ${isHomePage ? styles.homeLogo : ""}`}
    >
      <img src={isHomePage ? "/img/logo2.png" : "/img/logo.png"} alt="logo" />
    </Link>
  );
};

export default Logo;
