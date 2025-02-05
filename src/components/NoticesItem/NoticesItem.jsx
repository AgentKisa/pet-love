import styles from "./NoticesItem.module.css";

const NoticesItem = ({ notices }) => {
  return (
    <div className={styles.listContainer}>
      {notices.length === 0 ? (
        <p>No notices found.</p>
      ) : (
        notices.map((notice) => (
          <div key={notice._id} className={styles.noticeItem}>
            <img
              src={notice.imgURL}
              alt={notice.title}
              className={styles.noticeImage}
            />
            <div className={styles.noticeInfo}>
              <div className={styles.noticeHeader}>
                <h3 className={styles.noticeTitle}>{notice.title}</h3>
                <p className={styles.noticePopularity}>
                  <svg className={styles.favoriteIcon}>
                    <use href="/sprite.svg#icon-star"></use>
                  </svg>
                  {notice.popularity}
                </p>
              </div>
              <div className={styles.noticeLine}>
                <p className={styles.noticeText}>
                  <span className={styles.span}>Name:</span> {notice.name}
                </p>
                <p className={styles.noticeText}>
                  <span className={styles.span}>Birthday:</span>{" "}
                  {notice.birthday}
                </p>
                <p className={styles.noticeText}>
                  <span className={styles.span}>Sex:</span> {notice.sex}
                </p>
                <p className={styles.noticeText}>
                  <span className={styles.span}>Species:</span> {notice.species}
                </p>
                <p className={styles.noticeText}>
                  <span className={styles.span}>Category:</span>{" "}
                  {notice.category}
                </p>
              </div>
              <p className={styles.noticeDescription}>{notice.comment}</p>
              <p className={styles.noticePrice}>
                {notice.price ? `$${notice.price}` : "N/A"}
              </p>
            </div>
            <div className={styles.noticeActions}>
              <button className={styles.learnMore}>Learn more</button>
              <button className={styles.favoriteButton}>
                <svg className={styles.favoriteIcon}>
                  <use href="/sprite.svg#icon-heart-1"></use>
                </svg>
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default NoticesItem;
