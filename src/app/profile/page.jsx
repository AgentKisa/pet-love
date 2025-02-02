"use client";

import UserCard from "@/components/UserCard/UserCard";
// import MyNotices from "@/components/MyNotices/MyNotices";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "@/redux/userSlice";
import styles from "./Profile.module.css";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { userData, status, error } = useSelector((state) => state.user);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserData());
    }
  }, [dispatch, token]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Failed to load user data: {error?.message || error}</p>;
  }

  return (
    <div className={styles.profileContainer}>
      <UserCard />
      {/* <MyNotices /> */}
    </div>
  );
};

export default ProfilePage;
