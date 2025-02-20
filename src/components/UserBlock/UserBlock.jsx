import styles from "./UserBlock.module.css";
import clsx from "clsx";

const UserBlock = ({ user }) => {
  const name = user?.name || "";
  const email = user?.email || "";
  const phone = user?.phone || "";

  // Функция для определения класса бордера
  const getBorderClass = (value) =>
    clsx(styles.description, value ? styles.filledBorder : styles.emptyBorder);

  return (
    <div className={styles.userBlock}>
      <p className={styles.title}>My information</p>
      <p className={getBorderClass(name)}>{name || "No name provided"}</p>
      <p className={getBorderClass(email)}>{email || "No email provided"}</p>
      <p className={getBorderClass(phone)}>{phone || "+380"}</p>
    </div>
  );
};

export default UserBlock;
