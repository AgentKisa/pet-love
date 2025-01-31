import Link from "next/link";
import Image from "next/image";
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.errorCode}>
        <span>4</span>
        <Image src="/img/cat.png" alt="Cat" width={300} height={300} />
        <span>4</span>
      </div>
      <h1 className={styles.title}>Ooops! This page not found :(</h1>
      <Link href="/home">
        <button className={styles.homeButton}>To home page</button>
      </Link>
    </div>
  );
};

export default NotFound;
