"use client";

import Link from "next/link";
import styles from "./AddPet.module.css";

const AddPet = () => {
  return (
    <div className={styles.addPetContainer}>
      <Link href="/add-pet">
        <div className={styles.addPetButton}>
          Add pet
          <svg className={styles.addPetIcon}>
            <use href="/sprite.svg#icon-plus"></use>
          </svg>
        </div>
      </Link>
    </div>
  );
};

export default AddPet;
