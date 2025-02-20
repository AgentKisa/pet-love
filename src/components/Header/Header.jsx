"use client";

import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import AuthNav from "../AuthNav/AuthNav";
import Logo from "../Logo/Logo";
import Nav from "../Nav/Nav";
import UserNav from "../UserNav/UserNav";
import styles from "./Header.module.css";

const Header = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/home";
  const token = useSelector((state) => state.auth.token);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <header
      className={`${styles.header} ${isHomePage ? styles.homeHeader : ""}`}
    >
      <div className={styles.container}>
        <Logo isHomePage={isHomePage} />
        <Nav isHomePage={isHomePage} />
        {token ? (
          <UserNav isHomePage={isHomePage} />
        ) : (
          <AuthNav isHomePage={isHomePage} />
        )}
      </div>
    </header>
  );
};

export default Header;
