"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, updateUser } from "@/redux/userSlice";
import UserBlock from "../UserBlock/UserBlock";
import EditUserBtn from "../EditUserBtn/EditUserBtn";
import PetsBlock from "../PetsBlock/PetsBlock";
import LogOutBtn from "../LogOutBtn/LogOutBtn";
import styles from "./UserCard.module.css";

const UserCard = () => {
  const dispatch = useDispatch();
  const { userData, status } = useSelector((state) => state.user);
  const [showEditModal, setShowEditModal] = useState(false);
  const avatar = userData?.avatar || null;

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Failed to load user data</p>;
  }

  return (
    <div className={styles.userCard}>
      <div className={styles.headerContainer}>
        <p className={styles.title}>
          User
          <svg className={styles.icon}>
            <use href="/sprite.svg#icon-user-white"></use>
          </svg>
        </p>
        <div className={styles.avatar}>
          {avatar ? (
            <img src={avatar} alt={name} />
          ) : (
            <>
              <div className={styles.userIcon}>
                {userData?.name ? (
                  userData.name.charAt(0)
                ) : (
                  <svg className={styles.icon2}>
                    <use href="/sprite.svg#icon-user-yellow"></use>
                  </svg>
                )}
              </div>
              <button className={styles.uploadBtn}>Upload photo</button>
            </>
          )}
        </div>
        <div className={styles.header}>
          <EditUserBtn onClick={() => setShowEditModal(true)} />
        </div>
      </div>
      <UserBlock user={userData} userData={userData} />
      <PetsBlock pets={userData?.pets} />
      <LogOutBtn />
    </div>
  );
};

export default UserCard;
