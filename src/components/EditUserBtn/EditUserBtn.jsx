"use client";
import React, { useState } from "react";
import styles from "./EditUserBtn.module.css";
import ModalEditUser from "../ModalEditUser/ModalEditUser";

const EditUserBtn = ({ onClick }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button onClick={() => setShowModal(true)} className={styles.editButton}>
        <svg className={styles.icon}>
          <use href="/sprite.svg#icon-edit"></use>
        </svg>
      </button>
      {showModal && (
        <ModalEditUser
          isOpen={showModal}
          onRequestClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default EditUserBtn;
