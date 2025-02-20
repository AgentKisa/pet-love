"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/redux/authSlice";
import ModalApproveAction from "../ModalApproveAction/ModalApproveAction";
import styles from "./LogOutBtn.module.css";
import { useRouter } from "next/navigation";

const LogOutBtn = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      setShowModal(false); // Закрываем модалку перед редиректом
      router.push("/home");
    } catch (error) {
      console.error("Logout error:", error);
      setError(error.message || "Failed to log out");
      router.push("/");
    }
  };

  return (
    <>
      <button className={styles.logoutBtn} onClick={() => setShowModal(true)}>
        Log Out
      </button>

      <ModalApproveAction
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        onConfirm={handleLogout}
      />

      {error && <p className={styles.error}>{error.message}</p>}
    </>
  );
};

export default LogOutBtn;
