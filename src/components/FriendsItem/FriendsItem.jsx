import styles from "./FriendsItem.module.css";

const FriendsItem = ({ friend }) => {
  const { imageUrl, title, url, addressUrl, address, workDays, phone, email } =
    friend;

  const workHours = workDays ? workDays.find((day) => day.isOpen) : null; // Проверка, что workDays не null и не undefined

  return (
    <li className={styles.friendItem}>
      <div className={styles.workHours}>
        Hours: {workHours ? `${workHours.from} - ${workHours.to}` : "Closed"}
      </div>
      <div className={styles.info}>
        <img src={imageUrl} alt={title} className={styles.logo} />
        <div className={styles.details}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.contact}>
            <span className={styles.span}>Email: </span> {email}
          </p>
          <p className={styles.contact}>
            {" "}
            <span className={styles.span}>Address: </span>
            {address}
          </p>
          <p className={styles.contact}>
            {" "}
            <span className={styles.span}>Phone: </span>
            {phone}
          </p>
        </div>
      </div>
    </li>
  );
};

export default FriendsItem;
