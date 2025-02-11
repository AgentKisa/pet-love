"use client";
import Modal from "react-modal";
import styles from "./ModalAttention.module.css";
import React from "react";
import { useRouter } from "next/navigation"; // Импортируем useRouter

const ModalAttention = ({ isModalOpen, onClose }) => {
  const router = useRouter(); // Используем хук useRouter

  React.useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.50)",
      zIndex: 10,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "8px",
      border: "none",
      padding: "0px",
      maxWidth: "90vw",
      zIndex: 11,
      background: "none",
    },
  };

  const handleLogin = () => {
    router.push("/login");
    onClose();
  };

  const handleRegistration = () => {
    router.push("/register");
    onClose();
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={onClose}
      style={customStyles}
      overlayClassName={styles.overlay}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={onClose}>
          <svg className={styles.closeIcon}>
            <use href="/sprite.svg#icon-x-1"></use>
          </svg>
        </button>
        <div className={styles.catContainer}>
          <img src="/img/pappy.png" alt="Cat" className={styles.catImage} />
        </div>
        <h2 className={styles.title}>Attention</h2>
        <p className={styles.message}>
          We would like to remind you that certain functionality is available
          only to authorized users. If you have an account, please log in with
          your credentials. If you do not already have an account, you must
          register to access these features.
        </p>
        <div className={styles.actions}>
          <button className={styles.confirmBtn} onClick={handleLogin}>
            Log In
          </button>
          <button className={styles.cancelBtn} onClick={handleRegistration}>
            Registration
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalAttention;
