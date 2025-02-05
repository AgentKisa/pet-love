import Image from "next/image";
import styles from "./PetBlock.module.css";

const PetBlock = ({
  imgSrc,
  imgAlt,
  imgWidth,
  imgHeight,
  name,
  birthday,
  description,
  miniImgSrc,
  showPetInfo = true, // Новый пропс для контроля отображения petInfo
}) => {
  return (
    <div className={styles.petBlock}>
      <div className={styles.backgroundYellow}></div>
      <svg className={styles.lightYellow}>
        <use href="/sprite.svg#icon-Rectangle-4561"></use>
      </svg>
      <Image
        src={imgSrc}
        alt={imgAlt}
        width={imgWidth}
        height={imgHeight}
        className={styles.petImage}
      />
      {showPetInfo && ( // Условие рендеринга для petInfo
        <div className={styles.petInfo}>
          <div className={styles.petAvatar}>
            <img src={miniImgSrc} alt="Avatar" className={styles.avatarImage} />
          </div>
          <div className={styles.petText}>
            <div className={styles.petTitle}>
              <p className={styles.petName}>{name}</p>
              <p className={styles.petBirthday}>
                <span className={styles.span}>Birthday:</span> {birthday}
              </p>
            </div>
            <p className={styles.petDescription}>{description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetBlock;
