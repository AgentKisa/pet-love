import { useDispatch, useSelector } from "react-redux";
import styles from "./NoticesItem.module.css";
import { addFavorite, removeFavorite } from "@/redux/noticesSlice";
import { fetchUserData } from "@/redux/userSlice";

const NoticesItem = ({
  notices,
  handleLearnMoreClick,
  isFavoriteTab,
  onRemoveFavorite,
  gap,
  padding,
  width,
  justifyContent,
  showActionButton = true, // Добавляем проп
}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const userData = useSelector((state) => state.user.userData);
  const favorites = userData?.noticesFavorites || [];

  const isFavorite = (id) => {
    return favorites.some((fav) => fav._id === id);
  };

  const handleFavoriteToggle = (id) => {
    if (!token) return;
    if (isFavorite(id)) {
      dispatch(removeFavorite({ id, token })).then(() => {
        dispatch(fetchUserData());
      });
    } else {
      dispatch(addFavorite({ id, token })).then(() => {
        dispatch(fetchUserData());
      });
    }
  };

  return (
    <div className={styles.listContainer} style={{ gap, justifyContent }}>
      {notices.length === 0 ? (
        <p>No notices found.</p>
      ) : (
        notices.map((notice, index) => (
          <div
            key={`${notice._id}-${index}`}
            className={styles.noticeItem}
            style={{ padding, width: width?.item }}
          >
            <img
              src={notice.imgURL}
              alt={notice.title}
              className={styles.noticeImage}
              style={{ width: width?.image }}
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
              <button
                className={styles.learnMore}
                style={{ padding: "12px 79px" }}
                type="button"
                onClick={() => handleLearnMoreClick(notice._id)}
              >
                Learn more
              </button>
              {showActionButton &&
                (isFavoriteTab ? (
                  // Если это вкладка "My favorites pets" – показываем кнопку удаления
                  <button
                    className={styles.removeFavoriteButton}
                    type="button"
                    onClick={() => onRemoveFavorite(notice._id)}
                  >
                    <svg className={styles.trashIcon}>
                      <use href="/sprite.svg#icon-trash-2"></use>
                    </svg>
                  </button>
                ) : (
                  // Иначе – обычная кнопка для переключения избранного
                  <button
                    className={styles.favoriteButton}
                    type="button"
                    onClick={() => handleFavoriteToggle(notice._id)}
                  >
                    <svg className={styles.favoriteIcon}>
                      <use
                        href={
                          isFavorite(notice._id)
                            ? "/sprite.svg#icon-heart-filled"
                            : "/sprite.svg#icon-heart-1"
                        }
                      ></use>
                    </svg>
                  </button>
                ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default NoticesItem;
