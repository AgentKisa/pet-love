// components/PetsBlock.jsx
"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removePet } from "@/redux/petSlice";
import { fetchUserData } from "@/redux/userSlice";
import AddPet from "../AddPet/AddPet";
import styles from "./PetsBlock.module.css";

const PetsBlock = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.auth.token);
  const pets = userData?.pets || [];

  const handleRemovePet = (id) => {
    if (!token) return;
    dispatch(removePet(id)).then(() => {
      dispatch(fetchUserData());
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>My Pets</h2>
        <AddPet />
      </div>
      {pets.length === 0 ? (
        <p>No pets available</p>
      ) : (
        <ul className={styles.petList}>
          {pets.map((pet) => (
            <li key={pet._id} className={styles.petItem}>
              <img
                src={pet.imgURL}
                alt={pet.name}
                className={styles.petImage}
              />
              <div className={styles.petInfo}>
                <div className={styles.petHeader}>
                  <p className={styles.petTitle}>{pet.title}</p>
                  <button
                    onClick={() => handleRemovePet(pet._id)}
                    className={styles.removeButton}
                  >
                    <svg className={styles.trashIcon}>
                      <use href="/sprite.svg#icon-trash-2"></use>
                    </svg>
                  </button>
                </div>
                <div className={styles.petDetails}>
                  <p className={styles.petDescription}>
                    <span className={styles.span}>Name</span>
                    {pet.name}
                  </p>
                  <p className={styles.petDescription}>
                    <span className={styles.span}>Birthday</span>
                    {pet.birthday}
                  </p>
                  <p className={styles.petDescription}>
                    <span className={styles.span}>Sex</span>
                    {pet.sex}
                  </p>
                  <p className={styles.petDescription}>
                    <span className={styles.span}>Species</span>
                    {pet.species}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PetsBlock;
