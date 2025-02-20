"use client";

import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "@/redux/userSlice";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const ClientProvider = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname(); // Получаем текущий путь
  const token = useSelector((state) => state.auth.token);

  // Список публичных путей, где авторизация не требуется
  const publicPaths = [
    "/login",
    "/register",
    "/home",
    "/friends",
    "/news",
    "/notices",
  ];

  useEffect(() => {
    if (token) {
      dispatch(fetchUserData());
    }
  }, [dispatch, token]);

  useEffect(() => {
    // Редирект с корневого пути `/` на `/home`
    if (pathname === "/") {
      router.push("/home");
      return; // Прерываем выполнение, чтобы избежать лишних редиректов
    }

    // Если пользователь не авторизован И путь не публичный - редирект на /login
    if (!token && !publicPaths.includes(pathname)) {
      router.push("/login");
    }
  }, [token, router, pathname]);

  return <>{children}</>;
};

export default ClientProvider;
