"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFriends } from "@/redux/friendsSlice";
import FriendsItem from "@/components/FriendsItem/FriendsItem";
import styles from "./FriendsList.module.css";

const FriendsList = () => {
  const dispatch = useDispatch();
  const { friends, status, error } = useSelector((state) => state.friends);

  useEffect(() => {
    dispatch(fetchFriends());
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <ul className={styles.friendsList}>
      {friends.map((friend) => (
        <FriendsItem key={friend._id} friend={friend} />
      ))}
    </ul>
  );
};

export default FriendsList;
