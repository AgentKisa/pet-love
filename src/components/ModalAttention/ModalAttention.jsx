"use client";
import Modal from "react-modal";
import styles from "./ModalApproveAction.module.css";
import React from "react";

const ModalApproveAction = ({ isOpen, onRequestClose, onConfirm }) => {
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
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      overlayClassName={styles.overlay}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={onRequestClose}>
          <svg className={styles.closeIcon}>
            <use href="/sprite.svg#icon-x-1"></use>
          </svg>
        </button>
        <div className={styles.catContainer}>
          <img
            src="/img/cat-logout.png"
            alt="Cat"
            className={styles.catImage}
          />
        </div>
        <h2 className={styles.title}>Already leaving?</h2>
        <div className={styles.actions}>
          <button className={styles.confirmBtn} onClick={onConfirm}>
            login
          </button>
          <button className={styles.cancelBtn} onClick={onRequestClose}>
            registration
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalApproveAction;
