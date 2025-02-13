"use client";
import React, { useEffect, useRef } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNoticeById,
  clearNotice,
  removeFavorite,
  addFavorite,
} from "@/redux/noticesSlice";
import styles from "./ModalNotice.module.css";
import { fetchUserData } from "@/redux/userSlice";

const ModalNotice = ({ isOpen, onClose, noticeId }) => {
  React.useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { notice, loadingID, error } = useSelector((state) => state.notices);
  const prevNoticeId = useRef(null);
  const maxStars = 5;
  const filledStars = Math.min(notice?.popularity || 0, maxStars);
  const emptyStars = maxStars - filledStars;
  const userData = useSelector((state) => state.user.userData);
  const favorites = userData?.noticesFavorites || [];
  const isFavorite = notice
    ? favorites.some((fav) => fav._id === notice._id)
    : false;

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
      background: "white",
    },
  };

  const handleFavoriteToggle = () => {
    if (!token || !notice) return;
    if (isFavorite) {
      dispatch(removeFavorite({ id: notice._id, token })).then(() => {
        dispatch(fetchUserData());
      });
    } else {
      dispatch(addFavorite({ id: notice._id, token })).then(() => {
        dispatch(fetchUserData());
      });
    }
  };

  const [isEmailButtonActive, setIsEmailButtonActive] = React.useState(false); // Добавляем состояние

  const handleContactButtonClick = () => {
    // Добавляем обработчик клика
    setIsEmailButtonActive(true); // При клике устанавливаем состояние в true, чтобы отобразить email

    if (!isEmailButtonActive && notice.user?.email) {
      // Проверяем, что кнопка только что стала активной и email есть
      window.location.href = `mailto:${notice.user.email}`; // Открываем почтовую программу
    }
  };

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

        {loadingID ? (
          <p>Loading...</p>
        ) : error ? (
          <p className={styles.error}>
            {error.message || "Error loading data"}
          </p>
        ) : notice ? (
          <>
            <div className={styles.imageContainer}>
              <div className={styles.categoryBadge}>{notice.category}</div>
              <img
                src={notice.imgURL || "/img/pappy.png"}
                alt={notice.title}
                className={styles.image}
              />
            </div>

            <h2 className={styles.title}>{notice.title}</h2>
            <div className={styles.ratingContainer}>
              <div className={styles.rating}>
                {[...Array(maxStars)].map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < filledStars ? styles.filledStar : styles.emptyStar
                    }
                  >
                    <svg className={styles.star}>
                      <use
                        href={
                          i < filledStars
                            ? "/sprite.svg#icon-star1"
                            : "/sprite.svg#icon-star-none"
                        }
                      ></use>
                    </svg>
                  </span>
                ))}
              </div>

              <p className={styles.ratingNumber}>{notice.popularity}</p>
            </div>

            <div className={styles.details}>
              <p>
                <span>Name:</span> {notice.name}
              </p>
              <p>
                <span>Birthday:</span> {notice.birthday}
              </p>
              <p>
                <span>Sex:</span>
                {notice.sex}
              </p>
              <p>
                <span>Species:</span>
                {notice.species}
              </p>
            </div>
            <p className={styles.comment}>{notice.comment}</p>
            <p className={styles.noticePrice}>
              {notice.price ? `$${notice.price}` : "N/A"}
            </p>
            <div className={styles.actions}>
              <button
                className={styles.addRemoveBtn}
                onClick={handleFavoriteToggle}
              >
                {isFavorite ? "Remove from " : "Add to"}
                <svg className={styles.favoriteIcon}>
                  <use
                    href={
                      isFavorite
                        ? "/sprite.svg#icon-heart-filled"
                        : "/sprite.svg#icon-heart-2"
                    }
                  ></use>
                </svg>
              </button>
              <button
                className={styles.contactBtn}
                type="button" // Убедитесь, что тип кнопки "button", чтобы не отправлялась форма случайно
                onClick={handleContactButtonClick} // Добавим обработчик клика
              >
                {isEmailButtonActive ? notice.user?.email : "Contact"}{" "}
                {/* Условный рендеринг текста кнопки */}
              </button>
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
