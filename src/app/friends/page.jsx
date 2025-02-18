import Title from "@/components/Title/Title";
import FriendsList from "@/components/FriendsList/FriendsList";
import styles from "./Friends.module.css";

const FriendsPage = () => {
  return (
    <div className={styles.container}>
      <Title text="Our Friends" />
      <FriendsList />
    </div>
  );
};

export default FriendsPage;
