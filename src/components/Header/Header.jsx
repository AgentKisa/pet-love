"use client";

import { usePathname } from "next/navigation";
import AuthNav from "../AuthNav/AuthNav";
import Logo from "../Logo/Logo";
import Nav from "../Nav/Nav";
import styles from "./Header.module.css";

const Header = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/home";

  return (
    <header
      className={`${styles.header} ${isHomePage ? styles.homeHeader : ""}`}
    >
      <div className={styles.container}>
        <Logo isHomePage={isHomePage} />
        <Nav isHomePage={isHomePage} />
        <AuthNav isHomePage={isHomePage} />
      </div>
    </header>
  );
};

export default Header;
