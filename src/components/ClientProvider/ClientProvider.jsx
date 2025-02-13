"use client";

import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "@/redux/userSlice";
import { useEffect } from "react";

const ClientProvider = ({ children }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserData());
    }
  }, [dispatch, token]);

  return <>{children}</>;
};

export default ClientProvider;
