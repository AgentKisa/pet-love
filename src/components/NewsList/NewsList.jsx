import { useSelector } from "react-redux";
import NewsItem from "../NewsItem/NewsItem";
import styles from "./NewsList.module.css";

const NewsList = () => {
  const news = useSelector((state) => state.news.news);

  return (
    <ul className={styles.newsList}>
      {news.map((item) => (
        <NewsItem
          key={item._id}
          newsItem={item}
          gap="32px"
          padding="24px"
          width={{ item: "363px", image: "315px" }}
        />
      ))}
    </ul>
  );
};

export default NewsList;
