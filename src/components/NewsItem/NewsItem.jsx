import styles from "./NewsItem.module.css";

const NewsItem = ({ newsItem }) => {
  const formattedDate = new Date(newsItem.date)
    .toLocaleDateString("en-GB")
    .replace(/-/g, "/");
  return (
    <li className={styles.newsItem}>
      <img src={newsItem.avatar} alt={newsItem.title} />
      <div className={styles.content}>
        <h2>{newsItem.title}</h2>
        <p>{newsItem.text}</p>
      </div>
      <div className={styles.dateAndLink}>
        <time dateTime={newsItem.date} className={styles.date}>
          {formattedDate}
        </time>
        <a href={newsItem.url} target="_blank" rel="noopener noreferrer">
          Read more
        </a>
      </div>
    </li>
  );
};

export default NewsItem;
