import styles from "./UserBlock.module.css";

const UserBlock = ({ user, userData }) => {
  const name = user?.name || "No name provided";
  const email = user?.email || "No email provided";
  const phone = user?.phone || "+380";

  return (
    <div className={styles.userBlock}>
      <p className={styles.title}>My information</p>
      <p className={styles.description}>
        {typeof name === "string" ? name : "Invalid name"}
      </p>
      <p className={styles.description}>
        {typeof email === "string" ? email : "Invalid email"}
      </p>
      <p className={styles.description}>
        {typeof phone === "string" ? phone : "Invalid phone"}
      </p>
    </div>
  );
};

export default UserBlock;
