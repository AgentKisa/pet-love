"use client";
import React, { useState } from "react";
import styles from "./NoticesList.module.css";
import NoticesItem from "../NoticesItem/NoticesItem";
import { useSelector } from "react-redux";
import ModalAttention from "../ModalAttention/ModalAttention";
import ModalNotice from "../ModalNotice/ModalNotice";

const NoticesList = ({ notices }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const [selectedNoticeId, setSelectedNoticeId] = useState(null);

  /*************  ✨ Codeium Command 🌟  *************/
  const handleLearnMoreClick = (id) => {
    setSelectedNoticeId(id);
    setIsModalOpen(true);
    if (token) {
      setModalType("notice");
    } else {
      setModalType("attention");
    }
  };
  /******  fb896aef-525b-4e79-9630-2e5696f2f576  *******/
  const closeModal = () => {
    console.log("Closing modal");
    setIsModalOpen(false);
    setModalType(null);
    setSelectedNoticeId(null);
  };

  return (
    <div className={styles.listContainer}>
      <NoticesItem
        notices={notices}
        closeModal={closeModal}
        handleLearnMoreClick={handleLearnMoreClick}
        isModalOpen={isModalOpen}
        modalType={modalType}
        noticeId={selectedNoticeId}
      />

      {isModalOpen && modalType === "attention" && (
        <ModalAttention isModalOpen={isModalOpen} onClose={closeModal} />
      )}
      {isModalOpen && modalType === "notice" && (
        <>
          <ModalNotice
            isOpen={isModalOpen}
            onClose={closeModal}
            noticeId={selectedNoticeId}
          />
        </>
      )}
    </div>
  );
};

export default NoticesList;
