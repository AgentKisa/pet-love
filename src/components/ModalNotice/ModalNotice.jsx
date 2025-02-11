"use client";
import React, { useEffect, useRef } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchNoticeById, clearNotice } from "@/redux/noticesSlice";
import styles from "./ModalNotice.module.css";

const ModalNotice = ({ isOpen, onClose, noticeId }) => {
  React.useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { notice, loading, error } = useSelector((state) => state.notices);
  const prevNoticeId = useRef(null);

  console.log("nitice", notice, loading, error);
  console.log("token", token);

  useEffect(() => {
    if (isOpen && noticeId && token && noticeId !== prevNoticeId.current) {
      console.log("Запуск запроса для noticeId:", noticeId);
      prevNoticeId.current = noticeId;
      dispatch(fetchNoticeById({ id: noticeId, token }));
    }
  }, [isOpen, noticeId, token, dispatch]);

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.50)",
      zIndex: 1000,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      borderRadius: "8px",
      border: "none",
      padding: "0px",
      maxWidth: "90vw",
      zIndex: 1001,
      background: "white", // Добавляем фон
    },
  };

  console.log("notice2", notice);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      ariaHideApp={false}
    >
      <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={onClose} type="button">
          <svg className={styles.closeIcon}>
            <use href="/sprite.svg#icon-x-1"></use>
          </svg>
        </button>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className={styles.error}>
            {error.message || "Error loading data"}
          </p>
        ) : notice ? (
          <>
            <img
              src={notice.imgURL || "/img/pappy.png"}
              alt={notice.title}
              className={styles.image}
            />
            <h2 className={styles.title}>{notice.title}</h2>
            <div className={styles.details}>
              <p>Popularity: {notice.popularity}</p>
              <p>Name: {notice.name}</p>
              <p>Birthday: {notice.birthday}</p>
              <p>Sex: {notice.sex}</p>
              <p>Species: {notice.species}</p>
              <p>Category: {notice.category}</p>
              <p>Comment: {notice.comment}</p>
            </div>
            <div className={styles.actions}>
              <button className={styles.addRemoveBtn}>Add to/Remove</button>
              <a
                href={`tel:${notice.user?.phone}`}
                className={styles.contactBtn}
              >
                Contact
              </a>
            </div>
          </>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </Modal>
  );
};

export default ModalNotice;
