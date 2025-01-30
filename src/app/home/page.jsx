import Image from "next/image";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <section className={styles.home}>
      <div className={styles.block}>
        <h1 className={styles.title}>
          Take good <span className={styles.highlight}>care</span> of your small
          pets
        </h1>
        <p className={styles.description}>
          Choosing a pet for your home is a choice that is meant to enrich your
          life with immeasurable joy and tenderness.
        </p>
      </div>
      <div>
        <Image
          src="/img/image-47.png"
          alt="Pet background"
          layout="intrinsic"
          width={1216}
          height={384}
          objectFit="cover"
          className={styles.backgroundContainer}
        />
      </div>
    </section>
  );
};

export default Home;
