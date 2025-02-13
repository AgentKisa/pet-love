import styles from "./Title.module.css";

const Title = ({ text, className }) => {
  return <h1 className={`${styles.title} ${className}`}>{text}</h1>;
};

export default Title;
