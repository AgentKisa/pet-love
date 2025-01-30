import { useSelector } from "react-redux";
import NewsItem from "../NewsItem/NewsItem";
import styles from "./NewsList.module.css";

const NewsList = () => {
  const news = useSelector((state) => state.news.news);

  return (
    <ul className={styles.newsList}>
      {news.map((item) => (
        <NewsItem key={item._id} newsItem={item} />
      ))}
    </ul>
  );
};

export default NewsList;
